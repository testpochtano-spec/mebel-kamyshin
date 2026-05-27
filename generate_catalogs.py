#!/usr/bin/env python3
"""Generate PDF catalogs for the furniture store."""

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib import units
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# Register a font that supports Cyrillic (using DejaVu Sans or similar)
# We'll use a fallback approach - if no Cyrillic font, use standard fonts
font_registered = False
try:
    # Try to register DejaVu Sans for Cyrillic support
    dejavu_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    if os.path.exists(dejavu_path):
        pdfmetrics.registerFont(TTFont('DejaVu', dejavu_path))
        font_registered = True
except:
    pass

# Colors matching the website
PRIMARY_COLOR = colors.HexColor("#0F8B6D")
SECONDARY_COLOR = colors.HexColor("#F4C542")
TEXT_COLOR = colors.HexColor("#222222")
MUTED_COLOR = colors.HexColor("#666666")
BG_COLOR = colors.HexColor("#F7F7F5")

# Contact info
CONTACTS = {
    "name": "МЕБЕЛЬ — Камышин",
    "owner": "Лысенко Н.В.",
    "phone": "8-960-877-83-44",
    "phone2": "8-961-087-57-20",
    "address": "Волгоградская область, г. Камышин, ул. Пушкина, д. 103",
    "shortAddress": "г. Камышин, ул. Пушкина, 103",
    "hours": "Ежедневно с 8:00 до 17:00, без перерывов и выходных",
}

def create_cover_page(doc, title, subtitle, icon_text):
    """Create a cover page for the catalog."""
    styles = getSampleStyleSheet()

    # Title style
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=36,
        textColor=PRIMARY_COLOR,
        spaceAfter=30,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold' if not font_registered else 'DejaVu'
    )

    # Subtitle style
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Heading2'],
        fontSize=18,
        textColor=TEXT_COLOR,
        spaceAfter=50,
        alignment=TA_CENTER,
    )

    # Icon (large letter)
    icon_style = ParagraphStyle(
        'Icon',
        parent=styles['Normal'],
        fontSize=120,
        textColor=SECONDARY_COLOR,
        alignment=TA_CENTER,
        spaceAfter=50,
        fontName='Helvetica-Bold'
    )

    elements = []
    elements.append(Spacer(1, 2*units.inch))
    elements.append(Paragraph(icon_text, icon_style))
    elements.append(Spacer(1, 0.5*units.inch))
    elements.append(Paragraph(title, title_style))
    elements.append(Paragraph(subtitle, subtitle_style))
    elements.append(Spacer(1, 1*units.inch))

    # Store info
    store_style = ParagraphStyle(
        'StoreInfo',
        parent=styles['Normal'],
        fontSize=14,
        textColor=TEXT_COLOR,
        alignment=TA_CENTER,
        spaceAfter=10,
        fontName='Helvetica-Bold' if not font_registered else 'DejaVu'
    )

    elements.append(Paragraph(CONTACTS["name"], store_style))
    elements.append(Paragraph(f"г. Камышин, ул. Пушкина, 103",
                ParagraphStyle('Addr', parent=styles['Normal'], fontSize=12,
                              textColor=MUTED_COLOR, alignment=TA_CENTER)))

    doc.build(elements)

def create_content_page(doc, title, categories, page_num=0):
    """Create a content page with categories."""
    styles = getSampleStyleSheet()

    # Title style
    title_style = ParagraphStyle(
        'SectionTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=PRIMARY_COLOR,
        spaceAfter=20,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold' if not font_registered else 'DejaVu'
    )

    # Category style
    cat_style = ParagraphStyle(
        'Category',
        parent=styles['Normal'],
        fontSize=16,
        textColor=TEXT_COLOR,
        spaceAfter=15,
        fontName='Helvetica-Bold' if not font_registered else 'DejaVu'
    )

    # Description style
    desc_style = ParagraphStyle(
        'Description',
        parent=styles['Normal'],
        fontSize=12,
        textColor=MUTED_COLOR,
        spaceAfter=25,
        alignment=TA_JUSTIFY,
    )

    elements = []
    elements.append(Spacer(1, 0.5*units.inch))
    elements.append(Paragraph(title, title_style))
    elements.append(Spacer(1, 0.3*units.inch))

    for cat in categories:
        elements.append(Paragraph(f"• {cat['name']}", cat_style))
        elements.append(Paragraph(cat['desc'], desc_style))

    doc.build(elements, canvasmaker=None)

def create_contact_page(doc):
    """Create a contact page."""
    styles = getSampleStyleSheet()

    # Title style
    title_style = ParagraphStyle(
        'ContactTitle',
        parent=styles['Heading1'],
        fontSize=28,
        textColor=PRIMARY_COLOR,
        spaceAfter=30,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold' if not font_registered else 'DejaVu'
    )

    # Contact style
    contact_style = ParagraphStyle(
        'Contact',
        parent=styles['Normal'],
        fontSize=14,
        textColor=TEXT_COLOR,
        spaceAfter=12,
        fontName='Helvetica-Bold' if not font_registered else 'DejaVu'
    )

    # Label style
    label_style = ParagraphStyle(
        'Label',
        parent=styles['Normal'],
        fontSize=11,
        textColor=MUTED_COLOR,
        spaceAfter=8,
    )

    elements = []
    elements.append(Spacer(1, 1*units.inch))
    elements.append(Paragraph("Контакты", title_style))
    elements.append(Spacer(1, 0.5*units.inch))

    elements.append(Paragraph(CONTACTS["name"], contact_style))
    elements.append(Spacer(1, 0.3*units.inch))

    elements.append(Paragraph("Телефоны:", label_style))
    elements.append(Paragraph(f"📞 {CONTACTS['phone']}", contact_style))
    elements.append(Paragraph(f"📞 {CONTACTS['phone2']}", contact_style))
    elements.append(Spacer(1, 0.2*units.inch))

    elements.append(Paragraph("Адрес:", label_style))
    elements.append(Paragraph(f"📍 {CONTACTS['address']}", contact_style))
    elements.append(Spacer(1, 0.2*units.inch))

    elements.append(Paragraph("Режим работы:", label_style))
    elements.append(Paragraph(f"🕐 {CONTACTS['hours']}", contact_style))
    elements.append(Spacer(1, 0.5*units.inch))

    # CTA
    cta_style = ParagraphStyle(
        'CTA',
        parent=styles['Normal'],
        fontSize=14,
        textColor=PRIMARY_COLOR,
        alignment=TA_CENTER,
        spaceAfter=10,
        fontName='Helvetica-Bold' if not font_registered else 'DejaVu'
    )

    elements.append(Paragraph("Звоните — подберём идеальную мебель для вашего дома!", cta_style))
    elements.append(Paragraph("Работаем без перерывов и выходных",
                ParagraphStyle('SubCTA', parent=styles['Normal'], fontSize=11,
                              textColor=MUTED_COLOR, alignment=TA_CENTER)))

    doc.build(elements)

def generate_catalog(filename, title, subtitle, icon, categories):
    """Generate a complete catalog PDF."""
    output_path = os.path.join(os.path.dirname(__file__), 'public', 'catalogs', filename)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    doc = SimpleDocTemplate(output_path, pagesize=A4)

    # Cover page
    create_cover_page(doc, title, subtitle, icon)

    # Content pages
    doc = SimpleDocTemplate(output_path, pagesize=A4)
    all_elements = []

    styles = getSampleStyleSheet()

    # Cover
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=36,
        textColor=PRIMARY_COLOR,
        spaceAfter=30,
        alignment=TA_CENTER,
    )
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Heading2'],
        fontSize=18,
        textColor=TEXT_COLOR,
        spaceAfter=50,
        alignment=TA_CENTER,
    )
    icon_style = ParagraphStyle(
        'Icon',
        parent=styles['Normal'],
        fontSize=120,
        textColor=SECONDARY_COLOR,
        alignment=TA_CENTER,
        spaceAfter=50,
        fontName='Helvetica-Bold'
    )
    store_style = ParagraphStyle(
        'StoreInfo',
        parent=styles['Normal'],
        fontSize=14,
        textColor=TEXT_COLOR,
        alignment=TA_CENTER,
        spaceAfter=10,
        fontName='Helvetica-Bold'
    )

    all_elements.append(Spacer(1, 1.5*units.inch))
    all_elements.append(Paragraph(icon, icon_style))
    all_elements.append(Paragraph(title, title_style))
    all_elements.append(Paragraph(subtitle, subtitle_style))
    all_elements.append(Paragraph(CONTACTS["name"], store_style))
    all_elements.append(Paragraph("г. Камышин, ул. Пушкина, 103",
                ParagraphStyle('Addr', parent=styles['Normal'], fontSize=11,
                              textColor=MUTED_COLOR, alignment=TA_CENTER)))
    all_elements.append(Spacer(1, 0.5*units.inch))

    # Content
    section_title_style = ParagraphStyle(
        'SectionTitle',
        parent=styles['Heading2'],
        fontSize=20,
        textColor=PRIMARY_COLOR,
        spaceAfter=15,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )

    cat_style = ParagraphStyle(
        'Category',
        parent=styles['Normal'],
        fontSize=14,
        textColor=TEXT_COLOR,
        spaceAfter=10,
        fontName='Helvetica-Bold'
    )

    desc_style = ParagraphStyle(
        'Description',
        parent=styles['Normal'],
        fontSize=11,
        textColor=MUTED_COLOR,
        spaceAfter=20,
        alignment=TA_JUSTIFY,
    )

    all_elements.append(Spacer(1, 0.5*units.inch))
    all_elements.append(Paragraph("В нашем ассортименте:", section_title_style))

    for cat in categories:
        all_elements.append(Paragraph(f"• {cat['name']}", cat_style))
        all_elements.append(Paragraph(cat['desc'], desc_style))

    all_elements.append(Spacer(1, 0.3*units.inch))

    # Info box
    info_text = """Изготовление по индивидуальным размерам в любой цветовой гамме!<br/>
    Срок службы мебели — 15 лет. Прямые поставки от производителей."""

    info_style = ParagraphStyle(
        'Info',
        parent=styles['Normal'],
        fontSize=11,
        textColor=TEXT_COLOR,
        spaceAfter=30,
        alignment=TA_CENTER,
    )
    all_elements.append(Paragraph(info_text, info_style))

    # Contacts
    contact_title_style = ParagraphStyle(
        'ContactTitle',
        parent=styles['Heading2'],
        fontSize=18,
        textColor=PRIMARY_COLOR,
        spaceAfter=15,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )

    contact_style = ParagraphStyle(
        'ContactSmall',
        parent=styles['Normal'],
        fontSize=12,
        textColor=TEXT_COLOR,
        spaceAfter=8,
        fontName='Helvetica-Bold'
    )

    all_elements.append(Paragraph("Для заказа звоните:", contact_title_style))
    all_elements.append(Paragraph(f"📞 {CONTACTS['phone']}", contact_style))
    all_elements.append(Paragraph(f"📞 {CONTACTS['phone2']}", contact_style))
    all_elements.append(Paragraph(f"📍 {CONTACTS['shortAddress']}", contact_style))
    all_elements.append(Paragraph(f"🕐 {CONTACTS['hours']}",
                ParagraphStyle('Hours', parent=styles['Normal'], fontSize=10,
                              textColor=MUTED_COLOR, alignment=TA_CENTER)))

    doc.build(all_elements)
    print(f"✓ Created: {output_path}")

# Catalogs data
catalogs = [
    {
        "filename": "divany.pdf",
        "title": "Диваны и кресла",
        "subtitle": "Мягкая мебель для вашего дома",
        "icon": "🛋️",
        "categories": [
            {"name": "Прямые диваны", "desc": "Классические прямые диваны различных размеров. Идеальны для гостиных и спален. Механизмы раскладки: книжка, еврокнижка, аккордеон."},
            {"name": "Угловые диваны", "desc": "Просторные угловые диваны для больших гостиных. Максимум посадочных мест и комфорта для всей семьи."},
            {"name": "Диваны на заказ", "desc": "Изготовление диванов по индивидуальным размерам. Любая цветовая гамма обивки под ваш интерьер."},
            {"name": "Кресла", "desc": "Мягкие кресла в одном стиле с диванами. Классические и современные модели."},
            {"name": "Пуфы", "desc": "Декоративные и функциональные пуфы для дополнения интерьера."},
        ]
    },
    {
        "filename": "krovati.pdf",
        "title": "Кровати и матрасы",
        "subtitle": "Здоровый сон и комфортный отдых",
        "icon": "🛏️",
        "categories": [
            {"name": "Кровати", "desc": "Двуспальные и односпальные кровати с ортопедическими основаниями. Различные размеры и материалы изголовья."},
            {"name": "Матрасы Березка", "desc": "Отечественные матрасы премиум-класса с независимыми пружинами. Модели с эффектом зима/лето."},
            {"name": "Матрасы Vega", "desc": "Ортопедические матрасы от российского производителя. Пружинные и беспружинные модели."},
            {"name": "Матрасы Ascona", "desc": "Мировой лидер в производстве матрасов. Инновационные технологии для здорового сна."},
            {"name": "Наматрасники и аксессуары", "desc": "Защитные наматрасники, подушки различных размеров и форм."},
        ]
    },
    {
        "filename": "korpus.pdf",
        "title": "Корпусная мебель",
        "subtitle": "Функциональность и стиль вашего дома",
        "icon": "🚪",
        "categories": [
            {"name": "Шкафы", "desc": "Шкафы-купе и распашные шкафы. Встроенные и отдельно стоящие модели. Зеркальные и глухие фасады."},
            {"name": "Комоды и тумбы", "desc": "Практичные системы хранения для спален, гостиных и прихожих."},
            {"name": "Прихожие", "desc": "Готовые комплекты и модульные системы для прихожих. Вешалки, обувницы, зеркала."},
            {"name": "Кухни", "desc": "Кухонные гарнитуры различных стилей. Изготовление по индивидуальным размерам."},
            {"name": "Гостиные", "desc": "Современные стенки и модульные системы для гостиной. Тумбы под ТВ, витрины, полки."},
            {"name": "Мебель на заказ", "desc": "Изготовление корпусной мебели по вашим размерам и эскизам. Любая цветовая гамма и фурнитура."},
        ]
    },
]

if __name__ == "__main__":
    print("Generating PDF catalogs...")
    for catalog in catalogs:
        generate_catalog(
            catalog["filename"],
            catalog["title"],
            catalog["subtitle"],
            catalog["icon"],
            catalog["categories"]
        )
    print("\n✓ All catalogs generated successfully!")
    print(f"Output folder: {os.path.join(os.path.dirname(__file__), 'public', 'catalogs')}")
