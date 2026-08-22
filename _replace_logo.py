import re, glob, os

ROOT = r"C:\Users\Administrator\AccioWork\2026-08-17-15-17-39-019-bfd12c5b"
html_files = [f for f in glob.glob(os.path.join(ROOT, "**", "*.html"), recursive=True)]

header_re = re.compile(
    r'<a href="(\.\./)?index\.html" class="brand" aria-label="HonanSafe home">\s*'
    r'<span class="brand-mark">HS</span>\s*'
    r'<span class="brand-name">HongAn Fire<small>honansafe\.com</small></span>\s*</a>'
)
footer_re = re.compile(
    r'<a href="(\.\./)?index\.html" class="brand" style="margin-bottom:16px;">\s*'
    r'<span class="brand-mark">HS</span>\s*'
    r'<span class="brand-name" style="color:#fff;">HongAn Fire<small>honansafe\.com</small></span>\s*</a>'
)

changed = 0
for f in html_files:
    with open(f, "r", encoding="utf-8") as fh:
        html = fh.read()
    orig = html

    def hdr(m):
        pre = m.group(1) or ""
        return (
            f'<a href="{pre}index.html" class="brand" aria-label="HonanSafe home">\n'
            f'        <img src="{pre}assets/logo-horizontal.png" alt="HongAn Fire Equipment - HonanSafe" class="brand-logo">\n'
            f"      </a>"
        )

    def ftr(m):
        pre = m.group(1) or ""
        return (
            f'<a href="{pre}index.html" class="brand" style="margin-bottom:16px;">\n'
            f'          <img src="{pre}assets/logo-white.png" alt="HongAn Fire Equipment - HonanSafe" class="brand-logo brand-logo-footer">\n'
            f"        </a>"
        )

    html = header_re.sub(hdr, html)
    html = footer_re.sub(ftr, html)

    if html != orig:
        with open(f, "w", encoding="utf-8") as fh:
            fh.write(html)
        rel = os.path.relpath(f, ROOT)
        print("updated", rel)
        changed += 1

print("files changed:", changed)
