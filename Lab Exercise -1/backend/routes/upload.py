"""
CreatorIQ - Video Upload Blueprint
Handles file upload and validation for pre-upload videos.

IMPORTANT:
Do not perform AI/ML analysis during upload.
The upload API strictly handles video receiving and storage preparation.
"""

import os
import uuid
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename

upload_bp = Blueprint("upload", __name__, url_prefix="/api")

ALLOWED_EXTENSIONS = {"mp4", "mov", "webm"}

def allowed_file(filename: str) -> bool:
    """Validate allowed video container extensions."""
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route("/upload", methods=["POST"])
def upload_video():
    """
    POST /api/upload
    Endpoint to receive uploaded video file via multipart/form-data.
    
    Accepts:
        formData with key "video"
    Returns:
        JSON with file_id, filename, file_size, status
    """
    if "video" not in request.files:
        return jsonify({
            "error": "No video file provided in the request form-data.",
            "field": "video"
        }), 400

    file = request.files["video"]

    if file.filename == "":
        return jsonify({
            "error": "No file selected."
        }), 400

    if not allowed_file(file.filename):
        return jsonify({
            "error": f"Invalid file type. Supported formats are: {', '.join(sorted(ALLOWED_EXTENSIONS)).upper()}"
        }), 400

    clean_filename = secure_filename(file.filename)
    file_id = str(uuid.uuid4())
    unique_filename = f"{file_id}_{clean_filename}"

    upload_folder = current_app.config.get("UPLOAD_FOLDER", "uploads")
    os.makedirs(upload_folder, exist_ok=True)
    destination_path = os.path.join(upload_folder, unique_filename)

    file.save(destination_path)
    file_size_bytes = os.path.getsize(destination_path)

    # Note: Do not perform AI/ML analysis during upload.
    return jsonify({
        "status": "uploaded",
        "file_id": file_id,
        "filename": clean_filename,
        "size_bytes": file_size_bytes,
        "message": "Video successfully uploaded and queued for analysis."
    }), 201
