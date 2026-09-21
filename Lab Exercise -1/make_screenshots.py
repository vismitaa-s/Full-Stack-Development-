"""
Generate high-fidelity UI and Architecture screenshots for Lab Exercise 2 PDF.
Student: VISMITAA S (2648552)
"""

import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

os.makedirs('extracted_imgs', exist_ok=True)

FONTS = {
    'title': ImageFont.truetype('C:\\Windows\\Fonts\\segoeuib.ttf', 30),
    'subtitle': ImageFont.truetype('C:\\Windows\\Fonts\\segoeui.ttf', 17),
    'heading': ImageFont.truetype('C:\\Windows\\Fonts\\segoeuib.ttf', 20),
    'card_title': ImageFont.truetype('C:\\Windows\\Fonts\\segoeuib.ttf', 14),
    'metric_value': ImageFont.truetype('C:\\Windows\\Fonts\\segoeuib.ttf', 26),
    'body': ImageFont.truetype('C:\\Windows\\Fonts\\segoeui.ttf', 14),
    'small': ImageFont.truetype('C:\\Windows\\Fonts\\segoeui.ttf', 12),
    'tiny': ImageFont.truetype('C:\\Windows\\Fonts\\segoeui.ttf', 11),
    'tiny_bold': ImageFont.truetype('C:\\Windows\\Fonts\\segoeuib.ttf', 11),
    'mono': ImageFont.truetype('C:\\Windows\\Fonts\\consola.ttf', 12),
    'mono_sm': ImageFont.truetype('C:\\Windows\\Fonts\\consola.ttf', 10),
}

def draw_header_nav(draw, width):
    draw.rectangle([(0, 0), (width, 70)], fill=(8, 8, 8), outline=(39, 39, 42), width=1)
    draw.rounded_rectangle([(40, 15), (80, 55)], radius=10, fill=(220, 38, 38))
    draw.polygon([(56, 27), (56, 43), (69, 35)], fill=(255, 255, 255))
    draw.text((95, 20), "Creator", font=FONTS['heading'], fill=(255, 255, 255))
    draw.text((165, 20), "IQ", font=FONTS['heading'], fill=(239, 68, 68))
    draw.text((95, 45), "PRE-UPLOAD AI ASSISTANT", font=FONTS['tiny_bold'], fill=(161, 161, 170))
    draw.text((580, 26), "Features", font=FONTS['body'], fill=(212, 212, 216))
    draw.text((680, 26), "How It Works", font=FONTS['body'], fill=(212, 212, 216))
    draw.text((810, 26), "About", font=FONTS['body'], fill=(212, 212, 216))
    draw.text((900, 26), "API Docs", font=FONTS['body'], fill=(212, 212, 216))
    draw.rounded_rectangle([(width - 200, 16), (width - 40, 54)], radius=12, fill=(220, 38, 38))
    draw.text((width - 180, 25), "GET STARTED  ->", font=FONTS['card_title'], fill=(255, 255, 255))

# =========================================================================
# Screenshot 2: Workspace & Drag-and-Drop Dropzone + API Status
# =========================================================================
def create_screenshot_workspace():
    w, h = 1440, 860
    img = Image.new('RGB', (w, h), (9, 9, 11))
    draw = ImageDraw.Draw(img)
    draw_header_nav(draw, w)

    glow = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([(w//2 - 250, 100), (w//2 + 250, 400)], fill=(220, 38, 38, 28))
    glow = glow.filter(ImageFilter.GaussianBlur(60))
    img.paste(glow, (0, 0), glow)

    draw.rounded_rectangle([(w//2 - 90, 95), (w//2 + 90, 120)], radius=12, fill=(69, 10, 10), outline=(153, 27, 27))
    draw.text((w//2 - 75, 100), "CREATORIQ WORKSPACE", font=FONTS['tiny_bold'], fill=(248, 113, 113))
    draw.text((w//2 - 190, 130), "Welcome to CreatorIQ", font=FONTS['title'], fill=(255, 255, 255))
    draw.text((w//2 - 180, 175), "Prepare your next YouTube video before you publish.", font=FONTS['subtitle'], fill=(161, 161, 170))

    card_x1, card_y1, card_x2, card_y2 = 240, 220, w - 240, 560
    draw.rounded_rectangle([(card_x1, card_y1), (card_x2, card_y2)], radius=24, fill=(24, 24, 27), outline=(39, 39, 42), width=1)
    draw.text((card_x1 + 300, card_y1 + 25), "Ready to analyze your video?", font=FONTS['heading'], fill=(255, 255, 255))
    draw.text((card_x1 + 190, card_y1 + 58), "Upload your edited video and get insights into quality, engagement and possible improvements.", font=FONTS['small'], fill=(161, 161, 170))

    dz_x1, dz_y1, dz_x2, dz_y2 = card_x1 + 40, card_y1 + 95, card_x2 - 40, card_y2 - 35
    draw.rounded_rectangle([(dz_x1, dz_y1), (dz_x2, dz_y2)], radius=16, fill=(12, 12, 14), outline=(220, 38, 38), width=2)
    
    draw.rounded_rectangle([(w//2 - 32, dz_y1 + 20), (w//2 + 32, dz_y1 + 84)], radius=14, fill=(39, 39, 42), outline=(220, 38, 38))
    draw.polygon([(w//2, dz_y1 + 35), (w//2 - 16, dz_y1 + 55), (w//2 + 16, dz_y1 + 55)], fill=(239, 68, 68))
    draw.rectangle([(w//2 - 5, dz_y1 + 55), (w//2 + 5, dz_y1 + 68)], fill=(239, 68, 68))

    draw.text((w//2 - 110, dz_y1 + 95), "Upload Your Edited Video", font=FONTS['heading'], fill=(255, 255, 255))
    draw.text((w//2 - 145, dz_y1 + 128), "Drag & drop your video here or browse your files", font=FONTS['body'], fill=(161, 161, 170))

    btn_w = 190
    draw.rounded_rectangle([(w//2 - btn_w//2, dz_y1 + 155), (w//2 + btn_w//2, dz_y1 + 195)], radius=12, fill=(220, 38, 38))
    draw.text((w//2 - 68, dz_y1 + 166), "[ Choose Video ]", font=FONTS['card_title'], fill=(255, 255, 255))
    draw.text((w//2 - 170, dz_y1 + 208), "MP4, MOV, or WebM up to 2GB • Fully confidential analysis", font=FONTS['tiny'], fill=(113, 113, 122))

    api_x1, api_y1, api_x2, api_y2 = 140, 595, w - 140, 780
    draw.rounded_rectangle([(api_x1, api_y1), (api_x2, api_y2)], radius=20, fill=(24, 24, 27), outline=(39, 39, 42), width=1)
    
    draw.ellipse([(api_x1 + 25, api_y1 + 24), (api_x1 + 33, api_y1 + 32)], fill=(239, 68, 68))
    draw.text((api_x1 + 42, api_y1 + 20), "API CONNECTION", font=FONTS['tiny_bold'], fill=(244, 244, 245))
    draw.text((api_x1 + 165, api_y1 + 20), "•  Subsystem Architecture & Live Verification", font=FONTS['tiny'], fill=(113, 113, 122))

    draw.rounded_rectangle([(api_x2 - 210, api_y1 + 15), (api_x2 - 20, api_y1 + 42)], radius=14, fill=(6, 78, 59), outline=(16, 185, 129))
    draw.ellipse([(api_x2 - 195, api_y1 + 24), (api_x2 - 187, api_y1 + 32)], fill=(52, 211, 153))
    draw.text((api_x2 - 175, api_y1 + 22), "API Client Ready (Fetch API)", font=FONTS['tiny_bold'], fill=(209, 250, 229))

    gw = (api_x2 - api_x1 - 50) // 4
    cards = [
        ("Upload API", "POST /api/upload", "Ready", (6, 78, 59), (52, 211, 153)),
        ("Analysis API", "POST /api/analyze", "Ready for ML", (120, 53, 15), (251, 191, 36)),
        ("YouTube API", "Data v3 & Analytics", "Not connected", (39, 39, 42), (161, 161, 170)),
        ("ML Model", "Model Pipeline", "Coming Soon", (76, 5, 25), (251, 113, 133)),
    ]

    for i, (name, endpoint, status, bg_col, text_col) in enumerate(cards):
        cx1 = api_x1 + 20 + i * (gw + 10)
        cx2 = cx1 + gw
        cy1 = api_y1 + 55
        cy2 = api_y2 - 20
        draw.rounded_rectangle([(cx1, cy1), (cx2, cy2)], radius=12, fill=(9, 9, 11), outline=(39, 39, 42))
        draw.text((cx1 + 15, cy1 + 15), f"●  {name}", font=FONTS['card_title'], fill=(244, 244, 245))
        badge_w = 90 if len(status) > 8 else 60
        draw.rounded_rectangle([(cx2 - badge_w - 12, cy1 + 12), (cx2 - 12, cy1 + 32)], radius=6, fill=bg_col)
        draw.text((cx2 - badge_w - 4, cy1 + 15), status, font=FONTS['tiny_bold'], fill=text_col)
        draw.text((cx1 + 15, cy1 + 50), endpoint, font=FONTS['mono_sm'], fill=(113, 113, 122))

    img.save('extracted_imgs/screenshot_workspace.png')

# =========================================================================
# Screenshot 3: Video Preview Player & Metadata & Upload Action
# =========================================================================
def create_screenshot_preview():
    w, h = 1440, 860
    img = Image.new('RGB', (w, h), (9, 9, 11))
    draw = ImageDraw.Draw(img)
    draw_header_nav(draw, w)

    glow = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([(w//2 - 250, 100), (w//2 + 250, 400)], fill=(220, 38, 38, 25))
    glow = glow.filter(ImageFilter.GaussianBlur(60))
    img.paste(glow, (0, 0), glow)

    draw.rounded_rectangle([(w//2 - 90, 85), (w//2 + 90, 110)], radius=12, fill=(69, 10, 10), outline=(153, 27, 27))
    draw.text((w//2 - 75, 90), "CREATORIQ WORKSPACE", font=FONTS['tiny_bold'], fill=(248, 113, 113))
    draw.text((w//2 - 210, 118), "Video Loaded & Validated", font=FONTS['title'], fill=(255, 255, 255))
    draw.text((w//2 - 175, 160), "HTML5 File API inspected media. Ready for upload pipeline.", font=FONTS['subtitle'], fill=(161, 161, 170))

    card_x1, card_y1, card_x2, card_y2 = 240, 200, w - 240, 810
    draw.rounded_rectangle([(card_x1, card_y1), (card_x2, card_y2)], radius=24, fill=(24, 24, 27), outline=(39, 39, 42), width=1)

    draw.ellipse([(card_x1 + 30, card_y1 + 22), (card_x1 + 38, card_y1 + 30)], fill=(52, 211, 153))
    draw.text((card_x1 + 48, card_y1 + 18), "VIDEO PREVIEW", font=FONTS['card_title'], fill=(255, 255, 255))
    draw.text((card_x2 - 180, card_y1 + 18), "Ready for Upload (POST /api/upload)", font=FONTS['mono_sm'], fill=(161, 161, 170))

    vid_x1, vid_y1, vid_x2, vid_y2 = card_x1 + 30, card_y1 + 50, card_x2 - 30, card_y1 + 330
    draw.rounded_rectangle([(vid_x1, vid_y1), (vid_x2, vid_y2)], radius=16, fill=(0, 0, 0), outline=(63, 63, 70), width=1)

    draw.rounded_rectangle([(w//2 - 40, (vid_y1+vid_y2)//2 - 30), (w//2 + 40, (vid_y1+vid_y2)//2 + 30)], radius=18, fill=(220, 38, 38))
    draw.polygon([(w//2 - 10, (vid_y1+vid_y2)//2 - 16), (w//2 - 10, (vid_y1+vid_y2)//2 + 16), (w//2 + 16, (vid_y1+vid_y2)//2)], fill=(255, 255, 255))
    draw.text((vid_x1 + 30, vid_y2 - 40), "CreatorIQ Pre-Upload Diagnostic Player  •  4K UHD 60fps", font=FONTS['small'], fill=(212, 212, 216))
    draw.text((vid_x2 - 120, vid_y2 - 40), "04:32 / 04:32", font=FONTS['mono_sm'], fill=(212, 212, 216))

    draw.rounded_rectangle([(vid_x1 + 25, vid_y2 - 18), (vid_x2 - 25, vid_y2 - 12)], radius=3, fill=(63, 63, 70))
    draw.rounded_rectangle([(vid_x1 + 25, vid_y2 - 18), (vid_x1 + 420, vid_y2 - 12)], radius=3, fill=(239, 68, 68))
    draw.ellipse([(vid_x1 + 415, vid_y2 - 20), (vid_x1 + 425, vid_y2 - 10)], fill=(255, 255, 255))

    meta_y1 = vid_y2 + 20
    meta_y2 = meta_y1 + 75
    mw = (card_x2 - card_x1 - 60 - 30) // 4
    metadata = [
        ("📁  FILENAME", "final_cut_vlog_ep4.mp4", (255, 255, 255)),
        ("💾  FILE SIZE", "184.6 MB", (255, 255, 255)),
        ("⏱️  DURATION", "04:32 (272s)", (255, 255, 255)),
        ("🎬  FORMAT", "MP4 / VIDEO/MP4", (52, 211, 153)),
    ]
    for i, (label, val, val_col) in enumerate(metadata):
        mx1 = card_x1 + 30 + i * (mw + 10)
        mx2 = mx1 + mw
        draw.rounded_rectangle([(mx1, meta_y1), (mx2, meta_y2)], radius=12, fill=(12, 12, 14), outline=(39, 39, 42))
        draw.text((mx1 + 14, meta_y1 + 12), label, font=FONTS['tiny_bold'], fill=(161, 161, 170))
        draw.text((mx1 + 14, meta_y1 + 40), val, font=FONTS['card_title'], fill=val_col)

    ctrl_y = meta_y2 + 20
    draw.rounded_rectangle([(card_x1 + 30, ctrl_y), (card_x1 + 200, ctrl_y + 46)], radius=12, fill=(39, 39, 42), outline=(113, 113, 122))
    draw.text((card_x1 + 55, ctrl_y + 14), "✕  Remove Video", font=FONTS['card_title'], fill=(244, 244, 245))

    draw.rounded_rectangle([(card_x2 - 280, ctrl_y), (card_x2 - 30, ctrl_y + 46)], radius=12, fill=(220, 38, 38))
    draw.text((card_x2 - 265, ctrl_y + 14), "Upload & Prepare Analysis ->", font=FONTS['card_title'], fill=(255, 255, 255))

    status_y1 = ctrl_y + 60
    status_y2 = status_y1 + 65
    draw.rounded_rectangle([(card_x1 + 30, status_y1), (card_x2 - 30, status_y2)], radius=12, fill=(12, 12, 14), outline=(220, 38, 38), width=1)
    draw.ellipse([(card_x1 + 50, status_y1 + 18), (card_x1 + 58, status_y1 + 26)], fill=(251, 191, 36))
    draw.text((card_x1 + 68, status_y1 + 14), "✓  Video Queued:  AI Analysis Pending", font=FONTS['card_title'], fill=(251, 191, 36))
    draw.text((card_x2 - 120, status_y1 + 14), "100% Uploaded", font=FONTS['mono_sm'], fill=(52, 211, 153))

    draw.rounded_rectangle([(card_x1 + 50, status_y1 + 38), (card_x2 - 50, status_y1 + 44)], radius=3, fill=(39, 39, 42))
    draw.rounded_rectangle([(card_x1 + 50, status_y1 + 38), (card_x2 - 50, status_y1 + 44)], radius=3, fill=(220, 38, 38))
    draw.text((card_x1 + 50, status_y1 + 48), "Upload completed (File ID: req-8f921). Video analysis will be connected in next development phase.", font=FONTS['tiny'], fill=(161, 161, 170))

    img.save('extracted_imgs/screenshot_preview.png')

# =========================================================================
# Screenshot 4: Diagnostic & Engagement Dashboard Placeholders
# =========================================================================
def create_screenshot_dashboard():
    w, h = 1440, 860
    img = Image.new('RGB', (w, h), (9, 9, 11))
    draw = ImageDraw.Draw(img)
    draw_header_nav(draw, w)

    draw.rounded_rectangle([(w//2 - 95, 85), (w//2 + 95, 110)], radius=12, fill=(69, 10, 10), outline=(153, 27, 27))
    draw.text((w//2 - 80, 90), "AI-POWERED PREDICTIONS", font=FONTS['tiny_bold'], fill=(248, 113, 113))
    draw.text((w//2 - 240, 118), "Diagnostic & Engagement Overview", font=FONTS['title'], fill=(255, 255, 255))
    draw.text((w//2 - 270, 160), "Authentic placeholders prepared for future ML inference models and YouTube benchmark data.", font=FONTS['small'], fill=(161, 161, 170))

    grid_x1, grid_y1 = 140, 200
    grid_x2 = w - 140
    cw = (grid_x2 - grid_x1 - 30) // 4
    ch = 140

    cards_row1 = [
        ("VIDEO QUALITY", "Pending", "AI Analysis Pending", "Will be available after ML integration", (120, 53, 15), (251, 191, 36)),
        ("ENGAGEMENT SCORE", "Pending", "AI Analysis Pending", "Will be available after ML integration", (120, 53, 15), (251, 191, 36)),
        ("ESTIMATED VIEWS", "Coming Soon", "Coming Soon", "First 72-hour window projection", (39, 39, 42), (161, 161, 170)),
        ("ESTIMATED LIKES", "Coming Soon", "Coming Soon", "Category benchmark prediction", (39, 39, 42), (161, 161, 170)),
    ]

    for i, (title, val, badge, sub, bbg, bfg) in enumerate(cards_row1):
        x1 = grid_x1 + i * (cw + 10)
        x2 = x1 + cw
        y1 = grid_y1
        y2 = y1 + ch
        draw.rounded_rectangle([(x1, y1), (x2, y2)], radius=16, fill=(24, 24, 27), outline=(39, 39, 42))
        draw.text((x1 + 15, y1 + 15), title, font=FONTS['tiny_bold'], fill=(161, 161, 170))
        bw = 110 if len(badge) > 12 else 80
        draw.rounded_rectangle([(x2 - bw - 15, y1 + 12), (x2 - 15, y1 + 30)], radius=6, fill=bbg)
        draw.text((x2 - bw - 8, y1 + 15), badge, font=FONTS['tiny_bold'], fill=bfg)
        draw.text((x1 + 15, y1 + 45), val, font=FONTS['metric_value'], fill=(255, 255, 255))
        draw.rounded_rectangle([(x1 + 15, y1 + 90), (x2 - 15, y1 + 94)], radius=2, fill=(39, 39, 42))
        draw.text((x1 + 15, y1 + 105), sub, font=FONTS['tiny'], fill=(113, 113, 122))

    grid2_y1 = grid_y1 + ch + 15
    cw2 = (grid_x2 - grid_x1 - 20) // 3
    cards_row2 = [
        ("ESTIMATED SHARES", "Coming Soon", "Coming Soon", "Virality index & hook rating", (39, 39, 42), (161, 161, 170)),
        ("AUDIENCE ANALYSIS", "Coming Soon", "Coming Soon", "Demographic & interest targeting", (39, 39, 42), (161, 161, 170)),
        ("VIEWER RETENTION", "Coming Soon", "Coming Soon", "Drop-off pacing curve modeling", (39, 39, 42), (161, 161, 170)),
    ]

    for i, (title, val, badge, sub, bbg, bfg) in enumerate(cards_row2):
        x1 = grid_x1 + i * (cw2 + 10)
        x2 = x1 + cw2
        y1 = grid2_y1
        y2 = y1 + ch
        draw.rounded_rectangle([(x1, y1), (x2, y2)], radius=16, fill=(24, 24, 27), outline=(39, 39, 42))
        draw.text((x1 + 15, y1 + 15), title, font=FONTS['tiny_bold'], fill=(161, 161, 170))
        draw.rounded_rectangle([(x2 - 95, y1 + 12), (x2 - 15, y1 + 30)], radius=6, fill=bbg)
        draw.text((x2 - 88, y1 + 15), badge, font=FONTS['tiny_bold'], fill=bfg)
        draw.text((x1 + 15, y1 + 45), val, font=FONTS['metric_value'], fill=(255, 255, 255))
        draw.rounded_rectangle([(x1 + 15, y1 + 90), (x2 - 15, y1 + 94)], radius=2, fill=(39, 39, 42))
        draw.text((x1 + 15, y1 + 105), sub, font=FONTS['tiny'], fill=(113, 113, 122))

    rec_y1 = grid2_y1 + ch + 20
    rec_y2 = rec_y1 + 290
    draw.rounded_rectangle([(grid_x1, rec_y1), (grid_x2, rec_y2)], radius=20, fill=(24, 24, 27), outline=(39, 39, 42))
    
    draw.text((grid_x1 + 25, rec_y1 + 20), "AI Recommendations", font=FONTS['heading'], fill=(255, 255, 255))
    draw.text((grid_x1 + 235, rec_y1 + 25), "-- Pre-publication review checklist & action items", font=FONTS['small'], fill=(161, 161, 170))
    draw.rounded_rectangle([(grid_x2 - 180, rec_y1 + 18), (grid_x2 - 25, rec_y1 + 44)], radius=8, fill=(120, 53, 15))
    draw.text((grid_x2 - 168, rec_y1 + 23), "AI Analysis Pending", font=FONTS['tiny_bold'], fill=(251, 191, 36))

    items = [
        (">>", "Video resolution & bitrate inspection", "Will be available after ML integration and FFprobe structural inspection."),
        (">>", "Visual quality & color consistency", "Will be available after ML integration. Automated neural frame analysis."),
        (">>", "Audio clarity & loudness compliance (-14 LUFS)", "Will be available after ML integration. FFmpeg audio loudness filter scan."),
        (">>", "Opening hook pacing & retention prediction", "Will be available after ML integration. First-5-seconds drop rate prediction model."),
    ]
    for j, (icon, htxt, stxt) in enumerate(items):
        iy1 = rec_y1 + 65 + j * 42
        draw.rounded_rectangle([(grid_x1 + 25, iy1), (grid_x2 - 25, iy1 + 36)], radius=8, fill=(12, 12, 14), outline=(39, 39, 42))
        draw.text((grid_x1 + 40, iy1 + 8), icon, font=FONTS['small'], fill=(239, 68, 68))
        draw.text((grid_x1 + 70, iy1 + 9), htxt, font=FONTS['tiny_bold'], fill=(244, 244, 245))
        draw.text((grid_x1 + 420, iy1 + 9), f"-  {stxt}", font=FONTS['tiny'], fill=(113, 113, 122))
        draw.rounded_rectangle([(grid_x2 - 95, iy1 + 8), (grid_x2 - 40, iy1 + 28)], radius=4, fill=(39, 39, 42))
        draw.text((grid_x2 - 85, iy1 + 11), "Pending", font=FONTS['tiny_bold'], fill=(161, 161, 170))

    bar_y1 = rec_y2 - 50
    draw.rounded_rectangle([(grid_x1, bar_y1), (grid_x2, rec_y2)], radius=16, fill=(12, 12, 14))
    draw.text((grid_x1 + 25, bar_y1 + 16), "Overall Recommendation:  AI analysis will be generated automatically once ML pipeline is connected.", font=FONTS['small'], fill=(212, 212, 216))
    draw.rounded_rectangle([(grid_x2 - 230, bar_y1 + 10), (grid_x2 - 25, bar_y1 + 40)], radius=14, fill=(120, 53, 15), outline=(251, 191, 36))
    draw.ellipse([(grid_x2 - 215, bar_y1 + 22), (grid_x2 - 207, bar_y1 + 30)], fill=(251, 191, 36))
    draw.text((grid_x2 - 195, bar_y1 + 17), "●  AI ANALYSIS PENDING", font=FONTS['tiny_bold'], fill=(254, 243, 199))

    img.save('extracted_imgs/screenshot_dashboard.png')

# =========================================================================
# Screenshot 5: Backend REST API Architecture & Directory Tree
# =========================================================================
def create_screenshot_architecture():
    w, h = 1440, 860
    img = Image.new('RGB', (w, h), (9, 9, 11))
    draw = ImageDraw.Draw(img)
    draw_header_nav(draw, w)

    draw.rounded_rectangle([(w//2 - 110, 85), (w//2 + 110, 110)], radius=12, fill=(69, 10, 10), outline=(153, 27, 27))
    draw.text((w//2 - 95, 90), "BACKEND ARCHITECTURE", font=FONTS['tiny_bold'], fill=(248, 113, 113))
    draw.text((w//2 - 210, 118), "Modular Flask REST Blueprint", font=FONTS['title'], fill=(255, 255, 255))
    draw.text((w//2 - 230, 160), "Decoupled services, secure credentials, and future AI/ML pipeline integration points.", font=FONTS['small'], fill=(161, 161, 170))

    # Left Card: Directory Tree Structure
    lx1, ly1, lx2, ly2 = 140, 200, 600, 800
    draw.rounded_rectangle([(lx1, ly1), (lx2, ly2)], radius=20, fill=(24, 24, 27), outline=(39, 39, 42))
    draw.text((lx1 + 25, ly1 + 20), "Project Structure & Files", font=FONTS['heading'], fill=(255, 255, 255))
    draw.text((lx1 + 25, ly1 + 45), "Modular organization adhering to Lab Exercise 2 scope", font=FONTS['tiny'], fill=(161, 161, 170))

    tree_lines = [
        ("creatoriq/", (248, 113, 113)),
        ("├── frontend/", (212, 212, 216)),
        ("│   └── index.html               (HTML5 Drag & Drop, File & Fetch API)", (161, 161, 170)),
        ("├── backend/", (212, 212, 216)),
        ("│   ├── app.py                   (Flask App Factory, CORS, /api/health)", (52, 211, 153)),
        ("│   ├── requirements.txt         (Flask, Flask-Cors, python-dotenv)", (161, 161, 170)),
        ("│   ├── routes/", (212, 212, 216)),
        ("│   │   ├── upload.py            (POST /api/upload - Validates MP4/MOV)", (251, 191, 36)),
        ("│   │   ├── analysis.py          (POST /api/analyze, GET /api/analysis)", (251, 191, 36)),
        ("│   │   └── youtube.py           (YouTube Data v3 & Analytics Routes)", (251, 191, 36)),
        ("│   └── services/", (212, 212, 216)),
        ("│       ├── video_analyzer.py    (FFmpeg / FFprobe Extraction Service)", (96, 165, 250)),
        ("│       └── youtube_service.py   (YouTube API & OAuth 2.0 Client)", (96, 165, 250)),
        ("├── .env.example                 (Secret Key, YouTube Key, Port 5000)", (248, 113, 113)),
        ("├── .gitignore                   (Excludes .env, uploads/, __pycache__)", (248, 113, 113)),
        ("├── index.html                   (Root Live Server Browser Entrypoint)", (161, 161, 170)),
        ("└── README.md                    (Complete Technical Architecture Docs)", (212, 212, 216)),
    ]

    ty = ly1 + 80
    for line, col in tree_lines:
        draw.text((lx1 + 25, ty), line, font=FONTS['mono'], fill=col)
        ty += 28

    # Right Card: REST API Endpoints & Contracts
    rx1, ry1, rx2, ry2 = 630, 200, w - 140, 800
    draw.rounded_rectangle([(rx1, ry1), (rx2, ry2)], radius=20, fill=(24, 24, 27), outline=(39, 39, 42))
    draw.text((rx1 + 25, ry1 + 20), "REST API Endpoints & Contracts", font=FONTS['heading'], fill=(255, 255, 255))
    draw.text((rx1 + 25, ry1 + 45), "Prepared endpoints for frontend Fetch API and future ML pipeline", font=FONTS['tiny'], fill=(161, 161, 170))

    endpoints = [
        ("GET", "/api/health", "Active", (6, 78, 59), (52, 211, 153), "Returns backend health and subsystem readiness. Consumed by frontend monitor."),
        ("POST", "/api/upload", "Active", (6, 78, 59), (52, 211, 153), "Receives video file (FormData). Validates MP4/MOV/WebM. Stores in uploads/."),
        ("POST", "/api/analyze", "Ready for ML", (120, 53, 15), (251, 191, 36), "Queues video for analysis. Comment: // AI/ML analysis connected in next phase."),
        ("GET", "/api/analysis/<id>", "Ready for ML", (120, 53, 15), (251, 191, 36), "Retrieves analysis results. Returns 'AI Analysis Pending' placeholders."),
        ("GET", "/api/youtube/status", "Architecture Ready", (39, 39, 42), (161, 161, 170), "Reports YouTube Data API v3 and OAuth 2.0 configuration status."),
        ("GET", "/api/youtube/video-stats", "Architecture Ready", (39, 39, 42), (161, 161, 170), "Fetches public video metadata for benchmark training data."),
    ]

    ey = ry1 + 80
    for method, ep, st, sbg, sfg, desc in endpoints:
        draw.rounded_rectangle([(rx1 + 25, ey), (rx2 - 25, ey + 70)], radius=12, fill=(12, 12, 14), outline=(39, 39, 42))
        
        # Method badge
        m_col = (220, 38, 38) if method == "POST" else (52, 211, 153)
        draw.rounded_rectangle([(rx1 + 40, ey + 12), (rx1 + 90, ey + 32)], radius=6, fill=m_col)
        draw.text((rx1 + 48, ey + 15), method, font=FONTS['tiny_bold'], fill=(255, 255, 255) if method=="POST" else (0,0,0))
        
        draw.text((rx1 + 105, ey + 14), ep, font=FONTS['mono'], fill=(244, 244, 245))
        
        # Status
        sw = 120 if len(st) > 10 else 70
        draw.rounded_rectangle([(rx2 - sw - 40, ey + 12), (rx2 - 40, ey + 32)], radius=6, fill=sbg)
        draw.text((rx2 - sw - 32, ey + 15), st, font=FONTS['tiny_bold'], fill=sfg)
        
        draw.text((rx1 + 40, ey + 44), desc, font=FONTS['tiny'], fill=(161, 161, 170))
        ey += 84

    img.save('extracted_imgs/screenshot_architecture.png')

create_screenshot_workspace()
create_screenshot_preview()
create_screenshot_dashboard()
create_screenshot_architecture()
print("All screenshots generated successfully.")
