import time

from PIL import Image
import os

out = "br-friedhof-thumbnail"
target_size = 720

for file in os.listdir("."):
    if "." in file and not "py" in file:
        print(file)
        image = Image.open(file)
        (width, height) = image.size
        ratio = min(target_size/width, target_size/height)
        image.thumbnail((width * ratio, height * ratio))
        image.save(out + "/" + file)