import enum
import os
import pathlib
from check_dimensions import get_aspect_ratio

# Enter path and folder/category name and then run script to rename files
# in a sequential order
root_path = "C:\\Users\eglun\Documents\\2021\\professionalportfolio\eglmedia\\backend\\public\\images\\collections\\"
folder = 'Gippsland'


def rename_folder_files(file_path, folder_name):
    os.chdir(file_path)

    for subdir, dirs, files in os.walk(root_path):
        collection_name = subdir.split('\\')[-1]
        if not files:
            pass
        else:
            for count, file in enumerate(files):
                file_name, file_ext = os.path.splitext(file)
                file_path = os.path.join(subdir, file)

                orientation = get_aspect_ratio(file_path)
                file_name = f"{collection_name}_{orientation}_{str(count + 1)}"

                new_name = f"{file_name}{file_ext}"
                os.rename(file, new_name)


rename_folder_files(file_path=root_path, folder_name=folder)

# for file in files:
#     if not collection_name:
#         print("Not proper dir")
