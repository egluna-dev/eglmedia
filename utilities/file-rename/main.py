import os
from check_dimensions import get_aspect_ratio

# Enter path and folder/category name and then run script to rename files
# in a sequential order
root_path = "C:\\Users\\eglun\\Desktop\\Uluru Road"  # PORTFOLIO_IMAGES_PATH


def file_rename(current_file, current_collection_name, current_subdir, current_count):
    """
    Carries out renaming of file
    """
    file_name, file_ext = os.path.splitext(current_file)
    current_file_path = os.path.join(current_subdir, current_file)
    orientation = get_aspect_ratio(current_file_path)
    file_name = f"{current_collection_name}_{orientation}_{str(current_count + 1)}"

    new_name = f"{file_name}{file_ext}"
    # Uncomment the line below to execute file renaming routine
    os.rename(os.path.join(current_subdir, current_file),
              os.path.join(current_subdir, new_name))


def main(file_path):
    """
    Loops through main image collection folder.
    For each collection, another loops is done to rename every photo
    and convert from jpg to webp format by calling file_rename and convert_to_webp
    """
    for subdir, dirs, files in os.walk(file_path):
        collection_name = subdir.split('\\')[-1]
        if not files:
            pass
        else:
            for count, file in enumerate(files):
                # Use to rename files with their current extension and photo orientation
                file_rename(current_File=file, current_collection_name=collection_name,
                            current_subdir=subdir, current_count=count)


main(file_path=root_path)
