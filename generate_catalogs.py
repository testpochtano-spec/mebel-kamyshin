#!/usr/bin/env python3
"""Generate PDF catalogs for the current furniture funnel."""

from __future__ import annotations

import os
from html import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Image, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = os.path.dirname(__file__)
PUBLIC = os.path.join(ROOT, "public")
CATALOG_DIR = os.path.join(PUBLIC, "catalogs")

PRIMARY = colors.HexColor("#0F8B6D")
GOLD = colors.HexColor("#F4C542")
TEXT = colors.HexColor("#222222")
MUTED = colors.HexColor("#666666")
LIGHT_BG = colors.HexColor("#F7F7F5")
WARM_BG = colors.HexColor("#F2EFE7")
BORDER = colors.HexColor("#E6E2D8")

CONTACTS = {
    "name": "МЕБЕЛЬ - Камышин",
    "phone": "8-960-877-83-44",
    "phone2": "8-961-087-57-20",
    "email": "testpochtano@gmail.com",
    "address": "г. Камышин, ул. Пушкина, 103",
    "hours": "Ежедневно с 8:00 до 17:00",
}


def register_fonts() -> tuple[str, str]:
    regular = "/System/Library/Fonts/Supplemental/Arial.ttf"
    bold = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

    if os.path.exists(regular) and os.path.exists(bold):
        pdfmetrics.registerFont(TTFont("CatalogSans", regular))
        pdfmetrics.registerFont(TTFont("CatalogSans-Bold", bold))
        return "CatalogSans", "CatalogSans-Bold"

    from reportlab.pdfbase.cidfonts import UnicodeCIDFont

    pdfmetrics.registerFont(UnicodeCIDFont("HeiseiKakuGo-W5"))
    return "HeiseiKakuGo-W5", "HeiseiKakuGo-W5"


FONT, FONT_BOLD = register_fonts()


def styles():
    base = getSampleStyleSheet()
    return {
        "cover_title": ParagraphStyle(
            "CoverTitle",
            parent=base["Heading1"],
            fontName=FONT_BOLD,
            fontSize=30,
            leading=35,
            textColor=TEXT,
            alignment=TA_CENTER,
            spaceAfter=12,
        ),
        "cover_subtitle": ParagraphStyle(
            "CoverSubtitle",
            parent=base["Normal"],
            fontName=FONT,
            fontSize=13,
            leading=18,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=22,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Heading2"],
            fontName=FONT_BOLD,
            fontSize=21,
            leading=26,
            textColor=PRIMARY,
            spaceAfter=10,
        ),
        "card_title": ParagraphStyle(
            "CardTitle",
            parent=base["Heading3"],
            fontName=FONT_BOLD,
            fontSize=14,
            leading=18,
            textColor=TEXT,
            spaceAfter=5,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["Normal"],
            fontName=FONT,
            fontSize=10.5,
            leading=15,
            textColor=TEXT,
            spaceAfter=7,
        ),
        "muted": ParagraphStyle(
            "Muted",
            parent=base["Normal"],
            fontName=FONT,
            fontSize=9.5,
            leading=14,
            textColor=MUTED,
            spaceAfter=7,
        ),
        "small": ParagraphStyle(
            "Small",
            parent=base["Normal"],
            fontName=FONT,
            fontSize=8.5,
            leading=12,
            textColor=MUTED,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=base["Normal"],
            fontName=FONT_BOLD,
            fontSize=13,
            leading=18,
            textColor=TEXT,
            spaceAfter=7,
        ),
    }


S = styles()


def p(text: str, style: str = "body") -> Paragraph:
    return Paragraph(escape(text), S[style])


def image(path: str, width: float, height: float) -> Image | Spacer:
    full_path = os.path.join(PUBLIC, path.lstrip("/"))
    if not os.path.exists(full_path):
        return Spacer(width, height)
    img = Image(full_path, width=width, height=height)
    img.hAlign = "CENTER"
    return img


def supplier_line(names: list[str]) -> Paragraph:
    return Paragraph(
        f"<font color='#0F8B6D'><b>Фабрики:</b></font> {escape(', '.join(names))}",
        S["muted"],
    )


def bullet_list(items: list[str]) -> list[Paragraph]:
    return [p(f"- {item}", "body") for item in items]


def cover(title: str, subtitle: str, cover_image: str | None = None) -> list:
    elements = [Spacer(1, 20 * mm)]
    elements.append(Paragraph(escape(CONTACTS["name"]).upper(), S["cover_subtitle"]))
    elements.append(Paragraph(escape(title), S["cover_title"]))
    elements.append(Paragraph(escape(subtitle), S["cover_subtitle"]))

    if cover_image:
        elements.append(Spacer(1, 6 * mm))
        elements.append(image(cover_image, 145 * mm, 90 * mm))

    elements.append(Spacer(1, 12 * mm))
    elements.append(
        Table(
            [[p("Как заказать", "card_title")], *[[p(step, "body")] for step in [
                "1. Выберите направление или пришлите пример мебели.",
                "2. Позвоните или оставьте заявку с размерами и пожеланиями.",
                "3. Мы уточним наличие, сроки, доставку и актуальную стоимость.",
            ]]],
            colWidths=[160 * mm],
            style=[
                ("BACKGROUND", (0, 0), (-1, -1), LIGHT_BG),
                ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ],
        )
    )
    return elements


def direction_card(title: str, desc: str, bullets: list[str], photo: str | None = None) -> Table:
    text = [p(title, "card_title"), p(desc, "muted"), *bullet_list(bullets)]
    if photo:
        row = [image(photo, 58 * mm, 40 * mm), text]
        widths = [64 * mm, 105 * mm]
    else:
        row = [text]
        widths = [169 * mm]

    table = Table([row], colWidths=widths)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def contact_page() -> list:
    return [
        PageBreak(),
        Spacer(1, 18 * mm),
        Paragraph("Контакты для заказа", S["section"]),
        p("Если понравилось направление, модель, цвет или идея - позвоните нам. Мы уточним наличие, рассчитаем стоимость, доставку и сроки изготовления.", "body"),
        Spacer(1, 6 * mm),
        p(f"Телефон: {CONTACTS['phone']}", "contact"),
        p(f"Дополнительный телефон: {CONTACTS['phone2']}", "contact"),
        p(f"Email: {CONTACTS['email']}", "contact"),
        p(f"Адрес: {CONTACTS['address']}", "contact"),
        p(f"Режим работы: {CONTACTS['hours']}", "contact"),
        Spacer(1, 10 * mm),
        Table(
            [[p("Цены в каталоге не указаны специально: стоимость зависит от размеров, ткани, фасадов, комплектации, доставки и текущих условий фабрик.", "body")]],
            colWidths=[170 * mm],
            style=[
                ("BACKGROUND", (0, 0), (-1, -1), WARM_BG),
                ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 12),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
            ],
        ),
    ]


CATALOGS = {
    "divany.pdf": {
        "title": "Мягкая мебель",
        "subtitle": "Диваны, кресла, механизмы и обивки под интерьер",
        "cover": "/showroom/sofa-modular-showroom.jpg",
        "sections": [
            {
                "title": "Диваны и кресла",
                "suppliers": ["Волгоград Комфорт мебель", "Регина", "Стиль и Комфорт"],
                "desc": "Подбираем прямые, угловые, раскладные и модульные модели под размер комнаты.",
                "photo": "/showroom/sofa-gray-corner.jpg",
                "items": [
                    "прямые диваны для гостиной и спальни",
                    "угловые модели с левым или правым углом",
                    "диваны-кровати со спальным местом",
                    "кресла, кресла-кровати и мягкие группы",
                    "обивка по образцам ткани в магазине",
                ],
                "note": "Цифровые фото от фабрик ожидаются к августу. До этого работаем по образцам, каталогам и консультации.",
            }
        ],
    },
    "krovati.pdf": {
        "title": "Матрасы и кровати",
        "subtitle": "Подбор сна без цен на сайте - расчет по размеру и комплектации",
        "cover": "/showroom/mattress-showroom.jpg",
        "sections": [
            {
                "title": "Матрасы",
                "suppliers": ["Wellson", "Doctor Sleep", "DREAMSON", "Меридиан"],
                "desc": "Матрас подбирается по жесткости, росту, весу, размеру и привычке сна.",
                "photo": "/showroom/mattresses-tall.jpg",
                "items": [
                    "односпальные, полуторные и двуспальные размеры",
                    "пружинные и беспружинные решения",
                    "мягкие, средние и жесткие варианты",
                    "подбор под кровать, основание и бюджет",
                ],
                "note": "Список фабрик обновлен: сейчас магазин делает упор на новые предложения по качеству и условиям заказа.",
            },
            {
                "title": "Кровати и основания",
                "suppliers": ["Подбор по каталогам фабрик"],
                "desc": "Кровать можно подобрать комплектом с матрасом, основанием и вариантом хранения.",
                "photo": "/showroom/bed-white-storage.jpg",
                "items": [
                    "размеры 140, 160, 180 см и индивидуальный подбор",
                    "изголовья, ящики хранения, подъемные механизмы",
                    "цвет корпуса и ткани под интерьер",
                ],
                "note": "Для точного расчета нужны размеры комнаты и желаемое спальное место.",
            },
        ],
    },
    "korpus.pdf": {
        "title": "Кухни, корпусная мебель и столешницы",
        "subtitle": "Фабрики, декоры, модули и комплектующие под заказ",
        "cover": "/showroom/kitchen-white.jpg",
        "sections": [
            {
                "title": "Кухни",
                "suppliers": ["ДСВ", "COLA ДСВ", "Форес", "DARS", "Альбина", "Стиль", "Текс", "Диал", "STEND", "Micon", "BTS"],
                "desc": "Модульные кухни под размер помещения, цвет фасадов и нужную комплектацию.",
                "photo": "/showroom/kitchen-white.jpg",
                "items": [
                    "прямые, угловые и модульные варианты",
                    "подбор фасадов, корпусов и ручек",
                    "комплектация под технику и хранение",
                    "расчет после замера или размеров от клиента",
                ],
                "note": "Столешницы и мойки можно подобрать вместе с кухней.",
            },
            {
                "title": "Корпусная мебель",
                "suppliers": ["BTS", "Харон", "Мебелони МБ", "СТ Стенд мебель", "Вся мебель", "STEND", "Стиль", "Micon", "Текс", "DOMANI", "Диал", "Альбина", "Росток мебель"],
                "desc": "Шкафы, прихожие, гостиные, комоды и системы хранения под комнату.",
                "photo": "/showroom/wardrobe-set.jpg",
                "items": [
                    "шкафы, стенки, витрины, комоды",
                    "прихожие и модульные системы",
                    "подбор цвета и размера под интерьер",
                    "готовые решения и заказ по каталогам",
                ],
                "note": "Если есть фото комнаты, пришлите его - подберем проще и точнее.",
            },
            {
                "title": "Столешницы, столы, стулья, мойки и камень",
                "suppliers": ["СКИФ", "Кедр", "KLADOV", "GranFest", "PREMIAL", "MARRBAXX", "MAXSTONE"],
                "desc": "Комплектующие и материалы для кухни, столовой зоны и рабочих поверхностей.",
                "photo": "/showroom/table-set.jpg",
                "items": [
                    "столешницы и декоры под фасады",
                    "фабричные столы и стулья KLADOV",
                    "мойки и кухонные марки GranFest, PREMIAL, MARRBAXX, MAXSTONE",
                    "подбор цвета, формы и размера",
                ],
                "note": "Декоры СКИФ и Кедр подбираются по образцам и онлайн-каталогам.",
            },
        ],
    },
}


def build_catalog(filename: str, data: dict, include_contacts: bool = True) -> str:
    os.makedirs(CATALOG_DIR, exist_ok=True)
    output_path = os.path.join(CATALOG_DIR, filename)
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=16 * mm,
        bottomMargin=16 * mm,
        title=data["title"],
        author=CONTACTS["name"],
    )

    elements = cover(data["title"], data["subtitle"], data.get("cover"))
    elements.append(PageBreak())

    for index, section in enumerate(data["sections"]):
        if index:
            elements.append(PageBreak())
        elements.append(Paragraph(escape(section["title"]), S["section"]))
        elements.append(supplier_line(section["suppliers"]))
        elements.append(direction_card(section["title"], section["desc"], section["items"], section.get("photo")))
        elements.append(Spacer(1, 6 * mm))
        elements.append(
            Table(
                [[p(section["note"], "muted")]],
                colWidths=[169 * mm],
                style=[
                    ("BACKGROUND", (0, 0), (-1, -1), LIGHT_BG),
                    ("BOX", (0, 0), (-1, -1), 0.7, BORDER),
                    ("LEFTPADDING", (0, 0), (-1, -1), 10),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                    ("TOPPADDING", (0, 0), (-1, -1), 8),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ],
            )
        )
        elements.append(Spacer(1, 8 * mm))

    if include_contacts:
        elements.extend(contact_page())

    doc.build(elements)
    return output_path


def build_full_catalog() -> str:
    full = {
        "title": "Актуальный каталог подбора мебели",
        "subtitle": "Новые фабрики, направления и контакт для заказа без публикации цен",
        "cover": "/showroom/sofa-modular-showroom.jpg",
        "sections": [],
    }

    for data in CATALOGS.values():
        full["sections"].extend(data["sections"])

    return build_catalog("mebel-katalog.pdf", full)


if __name__ == "__main__":
    print("Generating PDF catalogs...")
    paths = [build_full_catalog()]
    for filename, data in CATALOGS.items():
        paths.append(build_catalog(filename, data))

    for path in paths:
        print(f"Created: {path}")
    print("Done.")
