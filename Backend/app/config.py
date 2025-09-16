import os
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = "mongodb+srv://civiclens_user:flutter@civiclens.scjwl3m.mongodb.net/civiclens?retryWrites=true&w=majority&appName=CivicLens"
DB_NAME = "civiclens"

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]
