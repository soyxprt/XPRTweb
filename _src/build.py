#!/usr/bin/env python3
"""
XPRT Group · Generador del sitio.

Cada página vive en _src/pages/<archivo>.html y empieza con un encabezado:

    <!--
    title: Título de la pestaña
    description: Descripción para Google y redes
    nav: academy
    -->
    ...contenido (desde <main> hacia adentro)...

Este script envuelve cada página con el encabezado, el menú y el pie
de _src/layout.html y escribe el resultado en la raíz del sitio.

Uso:  python3 _src/build.py
"""
import pathlib
import re

SRC = pathlib.Path(__file__).resolve().parent
ROOT = SRC.parent
SITE = "https://www.xprtgroup.com.co"

NAV = [
    ("academy", "academy.html", "Academy"),
    ("consulting", "consulting.html", "Consulting"),
    ("capital", "capital.html", "Capital"),
    ("agenda", "agenda.html", "Agenda"),
    ("viene", "lo-que-viene.html", "Lo que viene"),
    ("nosotros", "nosotros.html", "Nosotros"),
    ("recursos", "recursos.html", "Recursos"),
]


def parse(text):
    m = re.match(r"\s*<!--(.*?)-->\s*", text, re.S)
    meta = {}
    if m:
        for line in m.group(1).strip().splitlines():
            if ":" in line:
                k, v = line.split(":", 1)
                meta[k.strip()] = v.strip()
        text = text[m.end():]
    return meta, text


def nav_html(active):
    out = []
    for key, href, label in NAV:
        cur = ' aria-current="page"' if key == active else ""
        out.append(f'<a href="{href}"{cur}>{label}</a>')
    return "\n        ".join(out)


# Evita que el punto cuadrado quede solo en una línea: une la última palabra con el punto.
SQ = re.compile(r'([\w\u00C0-\u017F,.¿?¡!]+)(<span class="sq[^"]*"></span>)')


def keep_dot(html):
    return SQ.sub(r'<span class="nw">\1\2</span>', html)


def main():
    layout = (SRC / "layout.html").read_text(encoding="utf-8")
    pages = sorted((SRC / "pages").glob("*.html"))
    for page in pages:
        meta, body = parse(page.read_text(encoding="utf-8"))
        name = page.name
        url = SITE + "/" + ("" if name == "index.html" else name)
        html = (layout
                .replace("{{title}}", meta.get("title", "XPRT Group"))
                .replace("{{description}}", meta.get("description", ""))
                .replace("{{url}}", url)
                .replace("{{site}}", SITE)
                .replace("{{nav}}", nav_html(meta.get("nav", "")))
                .replace("{{body}}", keep_dot(body.strip())))
        (ROOT / name).write_text(html, encoding="utf-8")
        print("ok", name)


if __name__ == "__main__":
    main()
