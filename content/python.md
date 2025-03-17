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


centos
sudo dnf install python3-pip -y
```

### For macOS
```
brew install python

// This will install the latest version of Python along with pip.
```

### python version management tools -- Pyenv
Install Pyenv on CentOS 9
```
curl https://pyenv.run | bash
```

### Use Pyenv
```
// Install Python 3.10
pyenv install 3.10.13


# Set Python 3.10 as default
pyenv global 3.10.13

# Set local version for current directory
pyenv local 3.10.13


// Check current version:
pyenv versions
python --version


# List all available Python versions
pyenv install --list

# Uninstall a version
pyenv uninstall 3.10.13

# Show current version
pyenv version
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

### Poetry
Poetry 是一个用于管理 Python 项目的依赖和构建过程的工具。它简化了包管理和虚拟环境的创建，让开发者更容易管理项目的依赖关系。


#### Install Poetry Using Official Script
```
curl -sSL https://install.python-poetry.org | python3 -
```

#### You can test that everything is set up by executing
```
poetry --version
```
#### Add Poetry to PATH
如果是上述脚本安装的，通常不用这一步，会自动加到path里
If Poetry is not found after installation, add it to your PATH manually:
```
export PATH="$HOME/.local/bin:$PATH"

```
#### To make this change permanent, add it to your shell configuration file:
```
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

// Use ~/.zshrc instead of ~/.bashrc if you're using zsh
```
