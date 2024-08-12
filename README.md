
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
Add the following environment variables to your .env file in the server folder

`PORT`

`CLOUDINARY_API_KEY`

`CLOUDINARY_API_SECRET`

You can get your cloudinary keys from [here](https://cloudinary.com/)

Create a directory called `uploads` in the server as well.

Start Client

```bash
  cd client && npm install
```
```bash
  npm run dev
```
Add the following environment variables to your .env file in the client folder

`VITE_API_URL=http://localhost:5000`

## Environment Variables

To run this project, you will need to 
## API Reference

#### Get all items

```http
  POST /api/extractTextFromImage
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `file`    | `file`   | **Required**. Image file to process|


## Screenshots

![image](https://github.com/hanzalahwaheed/ImagineText/assets/101456741/3052e0e5-19db-471c-af3b-a072810c3262)



## Authors

- [hanzalahwaheed](https://www.github.com/hanzalahwaheed)


## License

[MIT](https://choosealicense.com/licenses/mit/)

