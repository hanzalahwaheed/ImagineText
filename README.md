
# ImagineText

Introducing Imagine Text 🌟. Harness TesseractJS to effortlessly convert image text into editable, copyable text. Unleash the power of visualization! 💡📷🔍




## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express, TesseractJS

**Cloud Storage:** Cloudinary


## Run Locally

Clone the project

```bash
  git clone https://github.com/hanzalahwaheed/ImagineText.git
```

Go to the project directory

```bash
  cd ImagineText
```

Start Server

```bash
  cd server && npm install
```
```bash
  node index.js
```

Start Client

```bash
  cd client && npm install
```
```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in the server folder

`PORT`

`CLOUDINARY_API_KEY`

`CLOUDINARY_API_SECRET`

You can get your cloudinary keys from [here](https://cloudinary.com/)
## API Reference

#### Get all items

```http
  POST /api/extractTextFromImage
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `file`    | `file`   | **Required**. Image file to process|


## Screenshots

(pending)


## Authors

- [hanzalahwaheed](https://www.github.com/hanzalahwaheed)


## License

[MIT](https://choosealicense.com/licenses/mit/)

