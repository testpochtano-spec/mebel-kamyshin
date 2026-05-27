#!/usr/bin/env python3
"""Generate multi-page PDF catalogs with product descriptions."""

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib import units
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.cidfonts import UnicodeCIDFont
import os

# Register Cyrillic font
pdfmetrics.registerFont(UnicodeCIDFont('HeiseiKakuGo-W5'))

# Colors
PRIMARY = colors.HexColor("#0F8B6D")
SECONDARY = colors.HexColor("#F4C542")
TEXT = colors.HexColor("#222222")
MUTED = colors.HexColor("#666666")
LIGHT_BG = colors.HexColor("#F7F7F5")

CONTACTS = {
    "name": "МЕБЕЛЬ — Камышин",
    "phone": "8-960-877-83-44",
    "phone2": "8-961-087-57-20",
    "address": "г. Камышин, ул. Пушкина, 103",
    "hours": "Ежедневно с 8:00 до 17:00",
}

CYRILLIC = 'HeiseiKakuGo-W5'

def generate_full_catalog():
    """Generate comprehensive multi-page catalog."""
    output_path = os.path.join(os.path.dirname(__file__), 'public', 'catalogs', 'mebel-katalog.pdf')
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    doc = SimpleDocTemplate(output_path, pagesize=A4, leftMargin=0.5*units.inch, rightMargin=0.5*units.inch)
    elements = []
    styles = getSampleStyleSheet()

    # === COVER PAGE ===
    cover_style = ParagraphStyle('CoverTitle', parent=styles['Heading1'], fontSize=36, textColor=PRIMARY,
                                  alignment=TA_CENTER, fontName=CYRILLIC, spaceAfter=20)
    subtitle_style = ParagraphStyle('CoverSubtitle', parent=styles['Heading2'], fontSize=18, textColor=TEXT,
                                     alignment=TA_CENTER, fontName=CYRILLIC, spaceAfter=40)

    elements.append(Spacer(1, 2*units.inch))
    elements.append(Paragraph("КАТАЛОГ МЕБЕЛИ", cover_style))
    elements.append(Paragraph("Фабричное качество по доступным ценам", subtitle_style))
    elements.append(Spacer(1, 0.5*units.inch))

    # Store info
    store_style = ParagraphStyle('StoreName', parent=styles['Normal'], fontSize=18, textColor=TEXT,
                                  alignment=TA_CENTER, fontName=CYRILLIC, spaceAfter=10)
    elements.append(Paragraph("МЕБЕЛЬ — Камышин", store_style))
    elements.append(Paragraph("г. Камышин, ул. Пушкина, 103",
                ParagraphStyle('Addr', parent=styles['Normal'], fontSize=12, textColor=MUTED,
                              alignment=TA_CENTER, fontName=CYRILLIC)))
    elements.append(Spacer(1, 1*units.inch))
    doc.build(elements)

    # === CONTENT PAGES ===
    elements = []

    # Section styles
    section_title = ParagraphStyle('Section', parent=styles['Heading1'], fontSize=24, textColor=PRIMARY,
                                    spaceAfter=20, fontName=CYRILLIC, alignment=TA_CENTER)
    product_name = ParagraphStyle('Product', parent=styles['Normal'], fontSize=14, textColor=TEXT,
                                   spaceAfter=5, fontName=CYRILLIC)
    product_desc = ParagraphStyle('ProductDesc', parent=styles['Normal'], fontSize=11, textColor=MUTED,
                                   spaceAfter=15, alignment=TA_JUSTIFY, fontName=CYRILLIC)

    # Color boxes for visual separation
    def color_box(color, text):
        return Paragraph(f"<b><font color='{color}'>■</font></b> {text}", product_name)

    # === DIVANS ===
    elements.append(Spacer(1, 0.5*units.inch))
    elements.append(Paragraph("ДИВАНЫ", section_title))

    divans = [
        {"name": "Прямые диваны", "desc": "Классические прямые диваны с механизмами книжка, еврокнижка, аккордеон. Спальное место от 140×200 см до 200×220 см. Идеальны для гостиных и спален.", "color": "#8B7355"},
        {"name": "Угловые диваны", "desc": "Просторные П-образные и Г-образные диваны. Максимум посадочных мест. Угловая секция может быть левосторонней или правосторонней.", "color": "#5F7D5F"},
        {"name": "Диваны-кровати", "desc": "Многофункциональная мебель с полноценным спальным местом. Механизмы: дельфин, еврокнижка, пантограф. Встроенные ящики для белья.", "color": "#6B7F8F"},
        {"name": "Модульные диваны", "desc": "Собираются как конструктор под вашу комнату. Можно менять конфигурацию, добавлять или убирать модули.", "color": "#8F6B7F"},
        {"name": "Кресла", "desc": "Мягкие кресла в стиле диванов. Классические, реклайнеры, кресла-кровати. Спальное место до 180×100 см.", "color": "#8F856B"},
    ]

    for div in divans:
        elements.append(color_box(div["color"], div["name"]))
        elements.append(Paragraph(div["desc"], product_desc))

    elements.append(Spacer(1, 0.3*units.inch))

    # === MATTRESSES ===
    elements.append(Paragraph("МАТРАСЫ И КРОВАТИ", section_title))

    mattresses = [
        {"name": "Березка — Мультиоскар", "desc": "Независимые пружины 510 шт/м². Эффект зима/лето. Высота 20 см. Нагрузка до 120 кг. Трикотажный чехол.", "color": "#4A7C59"},
        {"name": "Березка — Нэкст", "desc": "Жёсткий матрас с бикокосом. 256 пружин на м². Высота 18 см. Для любителей ортопедической поддержки.", "color": "#3D6B5A"},
        {"name": "Vega Original", "desc": "Пружинный блок 512 пружин. Натуральный войлок, ППУ. Высота 26 см. Средняя жёсткость. Гарантия 18 месяцев.", "color": "#5B8C7A"},
        {"name": "Vega Soft", "desc": "Мягкий комфортный матрас. Высота 23 см. Кокосовая койра + эластичная пена. Для тех, кто любит мягкую поверхность.", "color": "#6B9C8A"},
        {"name": "Ascona — Премиум", "desc": "Инновационные пружины AquaFlex. Гибридные наполнители. Высота до 28 см. Срок службы до 25 лет.", "color": "#4A6B7C"},
        {"name": "Кровати с основанием", "desc": "Двуспальные кровати с ортопедическим основанием на латах. Изголовье из массива. Размеры: 140×200, 160×200, 180×200 см.", "color": "#7C6B5A"},
    ]

    for mat in mattresses:
        elements.append(color_box(mat["color"], mat["name"]))
        elements.append(Paragraph(mat["desc"], product_desc))

    elements.append(Spacer(1, 0.3*units.inch))

    # === CORPUS FURNITURE ===
    elements.append(Paragraph("КОРПУСНАЯ МЕБЕЛЬ", section_title))

    corpus = [
        {"name": "Шкафы-купе", "desc": "Встроенные и корпусные шкафы. Фасады: зеркало, стекло, ЛДСП. Наполнение: штанги, полки, ящики. Любые размеры.", "color": "#8B6F47"},
        {"name": "Распашные шкафы", "desc": "Классические шкафы с дверцами. 2, 3, 4 двери. Внутри: отделение для плечиков, полки для белья, антресоли.", "color": "#6B5F4F"},
        {"name": "Комоды", "desc": "Узкие, широкие, высокие комоды. 4, 6, 8 ящиков на металлических направляющих. Современный и классический стиль.", "color": "#7B6B5B"},
        {"name": "Тумбы под ТВ", "desc": "Низкие тумбы для телевизора. Открытые полки и закрытые ящики. Под светодиодную подсветку.", "color": "#5B6B7B"},
        {"name": "Кухонные гарнитуры", "desc": "Прямые и угловые кухни. Фасады: эмаль, плёнка, пластик. Столешницы: ДСП, искусственный камень.", "color": "#4A7C6B"},
        {"name": "Прихожие", "desc": "Готовые комплекты: вешалка, зеркало, обувница, шкаф. Модульные системы — собирайте под свою прихожую.", "color": "#6B7C5A"},
    ]

    for corp in corpus:
        elements.append(color_box(corp["color"], corp["name"]))
        elements.append(Paragraph(corp["desc"], product_desc))

    # === INFO BOX ===
    elements.append(Spacer(1, 0.5*units.inch))
    info_style = ParagraphStyle('Info', parent=styles['Normal'], fontSize=11, textColor=TEXT,
                                alignment=TA_CENTER, fontName=CYRILLIC, spaceAfter=8)
    elements.append(Paragraph("✓ Изготовление по индивидуальным размерам", info_style))
    elements.append(Paragraph("✓ Любая цветовая гамма обивки и фасадов", info_style))
    elements.append(Paragraph("✓ Срок службы мебели — 15 лет", info_style))
    elements.append(Spacer(1, 0.5*units.inch))

    # === CONTACTS PAGE ===
    elements.append(Spacer(1, 0.5*units.inch))

    contact_title = ParagraphStyle('ContactTitle', parent=styles['Heading1'], fontSize=22, textColor=PRIMARY,
                                    spaceAfter=20, fontName=CYRILLIC, alignment=TA_CENTER)
    contact_text = ParagraphStyle('ContactText', parent=styles['Normal'], fontSize=14, textColor=TEXT,
                                   spaceAfter=10, fontName=CYRILLIC)

    elements.append(Paragraph("КОНТАКТЫ", contact_title))
    elements.append(Paragraph(f"Телефон: {CONTACTS['phone']}", contact_text))
    elements.append(Paragraph(f"Телефон: {CONTACTS['phone2']}", contact_text))
    elements.append(Paragraph(f"Адрес: {CONTACTS['address']}", contact_text))
    elements.append(Paragraph(f"Режим работы: {CONTACTS['hours']}", contact_text))
    elements.append(Spacer(1, 0.5*units.inch))

    cta_style = ParagraphStyle('CTA', parent=styles['Normal'], fontSize=14, textColor=PRIMARY,
                               alignment=TA_CENTER, fontName=CYRILLIC, spaceAfter=10)
    elements.append(Paragraph("Звоните — подберём идеальную мебель для вашего дома!", cta_style))
    elements.append(Paragraph("Работаем без перерывов и выходных",
                ParagraphStyle('SubCTA', parent=styles['Normal'], fontSize=11, textColor=MUTED,
                              alignment=TA_CENTER, fontName=CYRILLIC)))

    doc.build(elements)
    print(f"✓ Created: {output_path}")

if __name__ == "__main__":
    print("Generating full multi-page catalog...")
    generate_full_catalog()
    print("✓ Catalog generated successfully!")
