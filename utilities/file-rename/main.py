import os

# Enter path and folder/category name and then run script to rename files
# in a sequential order
path = "C:\\Users\\username\\Desktop\\folder_name"
folder = ''


def rename_folder_files(file_path, folder_name):
    os.chdir(file_path)
    # print(os.getcwd())

    for count, file in enumerate(os.listdir()):
        file_name, file_ext = os.path.splitext(file)
        file_name = f"{folder_name}{str(count + 1)}"

        new_name = f'{file_name}{file_ext}'
        os.rename(file, new_name)


rename_folder_files(file_path=path, folder_name=folder)
