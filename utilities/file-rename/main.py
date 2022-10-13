from concurrent.futures import process
import os
from check_dimensions import get_aspect_ratio

# Enter path and folder/category name and then run script to rename files
# in a sequential order
root_path = process.env.PORTFOLIO_IMAGES_PATH


def rename_folder_files(file_path):
    for subdir, dirs, files in os.walk(file_path):
        collection_name = subdir.split('\\')[-1]
        if not files:
            pass
        else:
            for count, file in enumerate(files):
                file_name, file_ext = os.path.splitext(file)
                current_file_path = os.path.join(subdir, file)
                orientation = get_aspect_ratio(current_file_path)
                file_name = f"{collection_name}_{orientation}_{str(count + 1)}"

                new_name = f"{file_name}{file_ext}"
                # Uncomment the line below to execute file renaming routine
                # os.rename(os.path.join(subdir, file),
                #           os.path.join(subdir, new_name))


rename_folder_files(file_path=root_path)
