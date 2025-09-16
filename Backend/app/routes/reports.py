from fastapi import APIRouter, HTTPException, Depends
from app.models.report import ReportCreate, StatusUpdate
from app.config import db
from app.utils.auth import get_current_user
from bson import ObjectId
from datetime import datetime

router = APIRouter()

@router.post("/")
async def create_report(report: ReportCreate, user = Depends(get_current_user)):
    now = datetime.utcnow().isoformat()
    doc = {
        "description": report.description,
        "location": report.location,
        "media_url": report.media_url,
        "status": "pending",
        "status_history": [{"status":"pending","time":now}],
        "upvotes": 0,
        "voters": [],
        "created_by": ObjectId(user["id"]),
        "created_at": now
    }
    res = await db.reports.insert_one(doc)
    doc["id"] = str(res.inserted_id)
    # convert created_by to string for response
    doc["created_by"] = str(doc["created_by"])
    return doc

@router.get("/")
async def list_reports(limit: int = 100):
    docs = []
    cursor = db.reports.find().sort("created_at", -1).limit(limit)
    async for r in cursor:
        r["id"] = str(r["_id"])
        r["created_by"] = str(r["created_by"])
        del r["_id"]
        docs.append(r)
    return docs

@router.get("/user")
async def my_reports(user = Depends(get_current_user)):
    cursor = db.reports.find({"created_by": ObjectId(user["id"])})
    out = []
    async for r in cursor:
        r["id"] = str(r["_id"])
        r["created_by"] = str(r["created_by"])
        del r["_id"]
        out.append(r)
    return out

@router.post("/{report_id}/upvote")
async def upvote(report_id: str, user = Depends(get_current_user)):
    r = await db.reports.find_one({"_id": ObjectId(report_id)})
    if not r:
        raise HTTPException(404, "Report not found")
    uid = ObjectId(user["id"])
    if uid in r.get("voters", []):
        raise HTTPException(400, "Already upvoted")
    await db.reports.update_one({"_id": ObjectId(report_id)}, {"$inc": {"upvotes": 1}, "$push": {"voters": uid}})
    r2 = await db.reports.find_one({"_id": ObjectId(report_id)})
    return {"message": "Report upvoted", "upvotes": r2["upvotes"]}

@router.patch("/{report_id}/status")
async def change_status(report_id: str, payload: StatusUpdate, user = Depends(get_current_user)):
    # only authority/admin allowed
    if user.get("role") not in ("admin", "authority"):
        raise HTTPException(403, "Not allowed")
    now = datetime.utcnow().isoformat()
    await db.reports.update_one({"_id": ObjectId(report_id)}, {"$set": {"status": payload.status}, "$push": {"status_history": {"status": payload.status, "time": now}}})
    r = await db.reports.find_one({"_id": ObjectId(report_id)})
    r["id"] = str(r["_id"])
    r["created_by"] = str(r["created_by"])
    del r["_id"]
    return {"message": "Status updated", "report": r}
