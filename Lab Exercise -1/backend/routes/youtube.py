"""
CreatorIQ - YouTube Data & Analytics Blueprint
Backend route handlers for YouTube Data API v3 and YouTube Analytics API.

IMPORTANT:
- Do NOT implement actual ML analysis using YouTube data yet.
- YouTube API keys and OAuth secrets are accessed through backend environment variables only.
- YouTube Data API v3 will provide views, likes, comments, category, title, description,
  published date, and channel information.
  This data will later be used as training/input data for the engagement prediction model.
- YouTube Analytics API will provide watch time, average view duration, retention curves,
  and subscriber dynamics via OAuth 2.0.
"""

from flask import Blueprint, jsonify, request
from ..services.youtube_service import YouTubeService

youtube_bp = Blueprint("youtube", __name__, url_prefix="/api/youtube")
yt_service = YouTubeService()

@youtube_bp.route("/status", methods=["GET"])
def youtube_api_status():
    """Returns the connection and configuration state of the YouTube services."""
    return jsonify({
        "youtube_data_api_v3": {
            "status": "Configured" if yt_service.is_configured() else "Not connected",
            "authentication": "API Key (Backend Environment Variable)"
        },
        "youtube_analytics_api": {
            "status": "Not connected",
            "authentication": "OAuth 2.0 (Creator Authentication)"
        },
        "ml_pipeline_usage": "Data will later be used as training/input data for the engagement prediction model."
    }), 200

@youtube_bp.route("/video-stats", methods=["GET"])
def get_video_stats():
    """
    GET /api/youtube/video-stats?id={video_id}
    Retrieves public YouTube video metrics via YouTube Data API v3.
    """
    video_id = request.args.get("id", "sample_video_id")
    # This data will later be used as training/input data for the engagement prediction model.
    data = yt_service.fetch_video_metadata(video_id)
    return jsonify(data), 200

@youtube_bp.route("/analytics", methods=["GET"])
def get_channel_analytics():
    """
    GET /api/youtube/analytics?channel_id={channel_id}
    Retrieves creator analytics via YouTube Analytics API with OAuth 2.0.
    """
    channel_id = request.args.get("channel_id", "sample_channel_id")
    data = yt_service.fetch_creator_analytics(channel_id)
    return jsonify(data), 200
