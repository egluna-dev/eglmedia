from PIL import Image
from pathlib import Path
import os


def convert_to_webp(file_source):
    """
    Converts images to WebP format

    Output: path to new image. pathLib.Path
    """
    destination = file_source.with_suffix(".webp")

    image = Image.open(file_source)
    image.save(destination, format="webp")

    return destination


def main_convert(folder_path):
    paths = Path(folder_path).glob("**/*.jpg")

    for path in paths:
        webp_path = convert_to_webp(path)
        print(webp_path)


current_path = "C:\\Users\\eglun\Documents\\2021\\professionalportfolio\\eglmedia\\backend\\public\\images\\thumbnails"

main_convert(current_path)
