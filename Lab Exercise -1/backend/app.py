"""
CreatorIQ - Flask Application Entrypoint
Backend API Architecture prepared for YouTube Data API, FFmpeg probe, and ML pipeline.
"""

import os
import sys

# Ensure root directory is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

from flask import Flask, jsonify, send_from_directory

try:
    from flask_cors import CORS
except ImportError:
    CORS = None

from backend.routes.upload import upload_bp
from backend.routes.analysis import analysis_bp
from backend.routes.youtube import youtube_bp

def create_app():
    """Application factory for CreatorIQ Flask Backend."""
    frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend"))
    if not os.path.exists(frontend_dir):
        frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

    app = Flask(__name__, static_folder=frontend_dir, static_url_path="")

    # Enable Cross-Origin Resource Sharing (CORS) for local frontend development
    if CORS:
        CORS(app, resources={r"/api/*": {"origins": "*"}})
    else:
        @app.after_request
        def add_cors_headers(response):
            response.headers["Access-Control-Allow-Origin"] = "*"
            response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
            response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
            return response

    # Configuration
    app.config["UPLOAD_FOLDER"] = os.getenv("UPLOAD_FOLDER", os.path.join(os.path.dirname(__file__), "..", "uploads"))
    app.config["MAX_CONTENT_LENGTH"] = int(os.getenv("MAX_CONTENT_LENGTH", 2 * 1024 * 1024 * 1024))  # 2 GB max

    # Register API Blueprints
    app.register_blueprint(upload_bp)
    app.register_blueprint(analysis_bp)
    app.register_blueprint(youtube_bp)

    # Health Check Endpoint
    @app.route("/api/health", methods=["GET"])
    def health_check():
        """
        GET /api/health
        Health verification endpoint consumed by frontend status monitor.
        """
        return jsonify({
            "status": "healthy",
            "service": "CreatorIQ Backend API",
            "version": "1.0.0",
            "endpoints": {
                "upload": "POST /api/upload",
                "analyze": "POST /api/analyze",
                "analysis_results": "GET /api/analysis/<id>",
                "health": "GET /api/health",
                "youtube_status": "GET /api/youtube/status",
                "youtube_stats": "GET /api/youtube/video-stats",
                "youtube_analytics": "GET /api/youtube/analytics"
            },
            "subsystems": {
                "upload_service": "Ready",
                "analysis_api": "Ready for ML integration",
                "youtube_data_api": "Architecture Ready (Key Pending)",
                "ml_model": "Coming Soon"
            }
        }), 200

    # Serve Frontend UI when hosted via Flask
    @app.route("/")
    def index():
        return send_from_directory(app.static_folder, "index.html")

    return app

if __name__ == "__main__":
    app = create_app()
    port = int(os.getenv("PORT", 5000))
    debug = os.getenv("FLASK_ENV", "development") == "development"
    print(f"Starting CreatorIQ Backend API on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=debug)
