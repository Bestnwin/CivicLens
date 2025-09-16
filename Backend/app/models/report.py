from pydantic import BaseModel
from typing import Optional

class ReportCreate(BaseModel):
    description: str
    location: str          # "lat,lng" or human readable
    media_url: Optional[str] = None

class StatusUpdate(BaseModel):
    status: str  # "pending", "in-progress", "resolved"
