---
title: "Python 教程"
metaTitle: "Python 教程，Python 基础入门，Python 案例"
metaDescription: "Python是什么,为什么要使用Python？"
---




### Check Python Installation
```
python3 --version
```

### Install pip
```
Debian/Ubuntu:

sudo apt update  
sudo apt install python3-pip  
```

### For macOS
```
brew install python

// This will install the latest version of Python along with pip.
```


### Upgrade pip
```
python3 -m pip install --upgrade pip
```

### install packages for requirements.txt
```
pip install -r requirements.txt

如果安装了python3，使用pip时报错：
zsh: command not found: pip

可以尝试
pip3 install -r requirements.txt
```

### create a new virtual environment in Python
Open your command prompt or terminal.  
Navigate to the directory where you want to create the virtual environment.  
Run the following command to create a new virtual environment  
```
python -m venv myenv

//Replace "myenv" with the name you want to give for your virtual environment.

python -m venv venv
```

Activate the virtual environment by running the activate script in the Scripts directory:
```
source myenv/bin/activate (Linux/Mac) 
myenv\Scripts\activate (Windows)
```
To exit the virtual environment, you can run the command:
```
deactivate
```

### fastAPI 
```
// 开发环境启动
fastapi dev main.py

// 生产环境启动
uvicorn main:app --host 0.0.0.0 --port 80

main: the file main.py (the Python "module").
app: the object created inside of main.py with the line app = FastAPI().

//  生产环境启动 in "daemon" mode (i.e., as a background process)
nohup uvicorn main:app --host 0.0.0.0 --port 9000 > /dev/null 2>&1 &
```