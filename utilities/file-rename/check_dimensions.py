from PIL import Image
from PIL.ExifTags import TAGS
import os


def get_aspect_ratio(image_path):
    # # Open image
    image = Image.open(image_path)

    # Get width and height
    width = int(image.width)
    height = int(image.height)

    if width > height:
        return "horizontal"
    else:
        return "vertical"
