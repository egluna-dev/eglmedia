import os
import pathlib
from check_dimensions import get_aspect_ratio

# Enter path and folder/category name and then run script to rename files
# in a sequential order
path = "C:\\Users\eglun\Documents\\2021\\professionalportfolio\eglmedia\\backend\\public\\images"
folder = 'Gippsland'


def rename_folder_files(file_path, folder_name):
    os.chdir(file_path)
    print(f"Absolute path: {pathlib.Path().absolute()}")
    print(f"File path: {os.getcwd()}")
    print(os.listdir())

    for count, file in enumerate(os.listdir()):
        file_name, file_ext = os.path.splitext(file)
        file_name = f"{folder_name}{str(count + 1)}"

        # orientation = get_aspect_ratio(file)

        # new_name = f'{file_name}{file_ext}_{orientation}'
        # os.rename(file, new_name)


rename_folder_files(file_path=path, folder_name=folder)
