# chromeless-instagram

Chromeless based service for interacting with Instagram. Think of replacement for API but without restrictions.


## Installation
Install via npm:
```
npm install chromeless-instagram --save
```

or via `git clone`:
```
git clone https://github.com/RafalWilinski/chromeless-instagram
cd chromeless-instagram
npm install
```

## Usage

Login to your account and get user photos:

```js
const Instagram = require("../build/lib/index");

async function run() {
  const session = new Instagram();
  const stats = await session.login("username", "password");
  const photos = await session.getMyPhotos();

  console.log(stats, photos);
}

run();

```

## Contributing

TBD

## License
MIT Licensed. Copyright (c) Rafal Wilinski 2017.
