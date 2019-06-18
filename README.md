# homebridge-ac
An homemade plugin made because I hate remotes and it's hot so i'll just spend the whole summer writing this thing so I can just ask Siri

## Install
### 1. Download the package
As you can imagin, just git clone the repo with

    git clone https://github.com/toto04/homebridge-ac.git

Go into the directory

    cd homebridge-ac

and npm install the hell out of it (globally)

    npm install -g

### 2. Edit the config file

Just look for the `example_config.json` file, what matters here is the _'accessories'_ array:

    "accessories": [
        ...,
        {
            "accessory": "AC Unit",
            "name": "Condizionatore"
        },
        ...
    ]

You'll need to set an accessory with this name and you're good to go