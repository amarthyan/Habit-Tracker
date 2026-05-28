import urllib.request
import re
import sys

# Get URL from command line argument, or prompt the user
if len(sys.argv) > 1:
    url = sys.argv[1]
else:
    url = input("Enter the URL to fetch: ")

try:
    response = urllib.request.urlopen(url)
    html = response.read().decode('utf-8')
    print("Fetched successfully. Length:", len(html))
    with open("site_index.html", "w", encoding="utf-8") as f:
        f.write(html)
    print("Saved to site_index.html")
    
    # Find script tags
    scripts = re.findall(r'<script[^>]*src="([^"]+)"', html)
    print("Scripts found:", scripts)
except Exception as e:
    print("Error:", e)
