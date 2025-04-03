from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.responses import JSONResponse
import uuid

app = FastAPI()

@app.post("/api/input/upload-image/")
async def upload_image(file: UploadFile = File(...)):  # Change 'image' to 'file'
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=422, detail="Invalid file type. Only images are allowed.")

    file_id = uuid.uuid4().int
    filename = file.filename
    source_type = "image"

    return JSONResponse(content={"id": file_id, "filename": filename, "source_type": source_type})
