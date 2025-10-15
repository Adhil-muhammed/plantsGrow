const express = require("express");
const qrcode = require("qrcode");
const path = require("path");

const app = express();
const port = 5000;

// This will be the public URL of your application once deployed.
// For local testing, it will be http://localhost:3000
const baseUrl = `http://localhost:${port}`;

// The URL that the QR code will point to
const redirectlink = "https://plants-grow.vercel.app";
const qrCodeTargetUrl = `${redirectlink}/plants-listing`;

// Sample plant data
const plants = [
  {
    name: "Monstera Deliciosa",
    price: 45.0,
    imageUrl: "/images/image1.jpg",
    description:
      "A stunning tropical plant with iconic split leaves that will make any room feel like a jungle paradise.",
    care: "Medium light, water weekly",
  },
  {
    name: "Snake Plant",
    price: 25.5,
    imageUrl: "/images/image2.jpg",
    description:
      "Perfect for beginners! This hardy plant tolerates neglect and purifies your air while you sleep.",
    care: "Low light, water monthly",
  },
  {
    name: "Golden Pothos",
    price: 18.75,
    imageUrl: "/images/image3.jpg",
    description:
      "A trailing beauty that's virtually indestructible. Perfect for hanging baskets or climbing moss poles.",
    care: "Medium light, water when dry",
  },
  //   {
  //     name: "Fiddle Leaf Fig",
  //     price: 60.0,
  //     imageUrl: "/images/image4.jpg",
  //     description:
  //       "The Instagram-famous tree that adds dramatic height and elegance to any modern living space.",
  //     care: "Bright indirect light, water weekly",
  //   },
  {
    name: "Peace Lily",
    price: 32.0,
    imageUrl: "/images/image5.jpg",
    description:
      "Elegant white blooms and glossy green leaves. Tells you when it needs water by drooping slightly.",
    care: "Medium light, keep soil moist",
  },
  {
    name: "Rubber Plant",
    price: 38.5,
    imageUrl: "/images/image6.jpg",
    description:
      "Glossy, thick leaves that shine with health. A statement plant that grows into an impressive tree.",
    care: "Bright light, water when topsoil dry",
  },
  {
    name: "ZZ Plant",
    price: 28.0,
    imageUrl: "/images/image7.jpg",
    description:
      "Practically immortal! Glossy leaves that tolerate low light and infrequent watering perfectly.",
    care: "Low to medium light, water monthly",
  },
  //   {
  //     name: "Philodendron Heartleaf",
  //     price: 22.0,
  //     imageUrl: "/images/image8.jpg",
  //     description:
  //       "Cascading heart-shaped leaves that grow quickly and forgive forgotten waterings.",
  //     care: "Medium light, water weekly",
  //   },
];

// Serve static files (optional, but good for a favicon or other assets)
app.use(express.static(path.join(__dirname, "public")));

// Home page route
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mariyam's Gardens Plant Shop</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: white;
                text-align: center;
                padding: 15px;
                overflow-x: hidden;
            }
            .container {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                padding: 40px 30px;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                max-width: 600px;
                width: 100%;
                margin: 10px;
            }
            h1 { 
                font-size: clamp(2.2em, 5vw, 3.5em);
                margin-bottom: 20px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                word-wrap: break-word;
            }
            p { 
                font-size: clamp(1em, 3vw, 1.3em);
                margin-bottom: 25px;
                opacity: 0.9;
                line-height: 1.6;
            }
            .btn {
                display: inline-block;
                background: linear-gradient(45deg, #4CAF50, #66BB6A);
                color: white;
                padding: 12px 25px;
                border-radius: 25px;
                text-decoration: none;
                font-weight: bold;
                margin: 8px;
                transition: all 0.3s ease;
                font-size: clamp(0.9em, 2.5vw, 1.1em);
                min-width: 140px;
                touch-action: manipulation;
            }
            .btn:hover, .btn:active {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(76, 175, 80, 0.4);
            }
            .plant-emoji {
                font-size: clamp(2.5em, 8vw, 4em);
                margin-bottom: 20px;
                display: block;
            }
            @media (max-width: 768px) {
                .container {
                    padding: 30px 20px;
                    margin: 5px;
                }
                .btn {
                    display: block;
                    margin: 10px auto;
                    text-align: center;
                    width: 80%;
                    max-width: 250px;
                }
            }
            @media (max-width: 480px) {
                body {
                    padding: 10px;
                }
                .container {
                    padding: 25px 15px;
                    border-radius: 15px;
                }
                h1 {
                    margin-bottom: 15px;
                }
                p {
                    margin-bottom: 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <span class="plant-emoji">🌿</span>
            <h1>Green Paradise</h1>
            <p>Welcome to your one-stop shop for beautiful indoor plants! Transform your space into a green oasis with our carefully curated collection.</p>
            <a href="/plants-listing" class="btn">🌱 Browse Plants</a>
            <a href="/generate-qr" class="btn">📱 Get QR Code</a>
        </div>
    </body>
    </html>
  `);
});

// Route for generating the QR code (points to /plants-listing)
app.get("/generate-qr", async (req, res) => {
  try {
    const qrCodeDataUrl = await qrcode.toDataURL(qrCodeTargetUrl);
    res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>QR Code - Mariyam's Gardens Plant Shop</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { 
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        min-height: 100vh;
                        display: flex; 
                        flex-direction: column; 
                        align-items: center; 
                        justify-content: center; 
                        color: white;
                        text-align: center;
                        padding: 15px;
                        overflow-x: hidden;
                    }
                    .container {
                        background: white;
                        padding: 30px 25px;
                        border-radius: 20px;
                        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                        color: #333;
                        max-width: 500px;
                        width: 100%;
                        margin: 10px;
                    }
                    .qr-code { 
                        border: 3px solid #4CAF50;
                        padding: 15px; 
                        background-color: white; 
                        margin: 25px 0;
                        border-radius: 15px;
                        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                        max-width: 100%;
                        height: auto;
                    }
                    .qr-code img {
                        max-width: 100%;
                        height: auto;
                    }
                    h1 { 
                        color: #2E7D32; 
                        margin-bottom: 20px;
                        font-size: clamp(1.5em, 4vw, 2em);
                        word-wrap: break-word;
                    }
                    p { 
                        font-size: clamp(0.9em, 2.5vw, 1.1em);
                        color: #666;
                        line-height: 1.6;
                        margin-bottom: 15px;
                    }
                    a { 
                        color: #4CAF50; 
                        text-decoration: none; 
                        font-weight: bold;
                        word-wrap: break-word;
                        overflow-wrap: break-word;
                    }
                    a:hover { 
                        text-decoration: underline; 
                    }
                    .plant-emoji {
                        font-size: clamp(2em, 6vw, 3em);
                        margin-bottom: 20px;
                        display: block;
                    }
                    .instructions {
                        background: #E8F5E8;
                        padding: 15px;
                        border-radius: 10px;
                        margin-top: 20px;
                        border-left: 4px solid #4CAF50;
                        text-align: left;
                    }
                    @media (max-width: 768px) {
                        .container {
                            padding: 25px 20px;
                            margin: 5px;
                        }
                        .qr-code {
                            padding: 10px;
                            margin: 20px 0;
                        }
                        .instructions {
                            padding: 12px;
                        }
                    }
                    @media (max-width: 480px) {
                        body {
                            padding: 10px;
                        }
                        .container {
                            padding: 20px 15px;
                            border-radius: 15px;
                        }
                        h1 {
                            margin-bottom: 15px;
                        }
                        p {
                            margin-bottom: 12px;
                        }
                        .qr-code {
                            margin: 15px 0;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <span class="plant-emoji">🌿</span>
                    <h1>Mariyam's Gardens</h1>
                    <p>Scan the QR code below to browse our beautiful plant collection!</p>
                    <img class="qr-code" src="${qrCodeDataUrl}" alt="QR Code to Plant Collection">
                    <div class="instructions">
                        <p><strong>How to use:</strong></p>
                        <p>1. Open your phone's camera app</p>
                        <p>2. Point it at the QR code above</p>
                        <p>3. Tap the notification to visit our plant shop</p>
                    </div>
                   
                </div>
            </body>
            </html>
        `);
  } catch (err) {
    console.error("Error generating QR code:", err);
    res.status(500).send("Error generating QR code.");
  }
});

//  <p style="margin-top: 20px;">
//                         Or visit directly: <a href="${qrCodeTargetUrl}">${qrCodeTargetUrl}</a>
//                     </p>

// The new endpoint that the QR code will point to, showing plants and prices
app.get("/plants-listing", (req, res) => {
  let plantsHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Our Plant Collection</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { 
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    padding: 15px;
                    color: #333;
                    overflow-x: hidden;
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                    color: white;
                    padding: 0 10px;
                }
                .header h1 { 
                    font-size: clamp(2em, 6vw, 3em);
                    margin-bottom: 10px;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                    word-wrap: break-word;
                }
                .header p {
                    font-size: clamp(1em, 3vw, 1.2em);
                    opacity: 0.9;
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.5;
                }
                .plants-container { 
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 10px;
                }
                .plant-card { 
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                    padding: 20px;
                    text-align: center;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    width: 100%;
                    min-height: 450px;
                    display: flex;
                    flex-direction: column;
                }
                .plant-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 5px;
                    background: linear-gradient(90deg, #4CAF50, #8BC34A, #CDDC39);
                }
                .plant-card:hover { 
                    transform: translateY(-5px) scale(1.01);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
                }
                .plant-card img { 
                    width: 100%;
                    object-fit: cover;
                    border-radius: 15px;
                    margin-bottom: 15px;
                    background: #f8f9fa;
                    padding: 8px;
                    height: 300px;
                }
                .plant-card h2 { 
                    color: #2E7D32;
                    font-size: clamp(1.2em, 3vw, 1.4em);
                    margin-bottom: 8px;
                    font-weight: 600;
                    line-height: 1.3;
                }
                .plant-card .price { 
                    font-weight: bold;
                    color: #1B5E20;
                    font-size: clamp(1.4em, 4vw, 1.6em);
                    margin-bottom: 12px;
                    background: linear-gradient(45deg, #4CAF50, #66BB6A);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .plant-card .description {
                    color: #666;
                    line-height: 1.4;
                    margin-bottom: 12px;
                    font-size: clamp(0.85em, 2.2vw, 0.95em);
                    flex-grow: 1;
                }
                .plant-card .care-info {
                    background: #E8F5E8;
                    padding: 8px;
                    border-radius: 8px;
                    color: #2E7D32;
                    font-size: clamp(0.8em, 2vw, 0.85em);
                    font-weight: 500;
                    margin-bottom: 15px;
                }
                .footer {
                    text-align: center;
                    margin-top: 40px;
                    color: white;
                    opacity: 0.8;
                    padding: 20px 10px;
                }
                .footer p {
                    font-size: clamp(0.9em, 2.5vw, 1em);
                    margin-bottom: 5px;
                }
                .buy-btn {
                    background: linear-gradient(45deg, #4CAF50, #66BB6A);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 20px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: clamp(0.85em, 2.2vw, 0.95em);
                    touch-action: manipulation;
                    width: 100%;
                    max-width: 200px;
                    margin: 0 auto;
                }
                .buy-btn:hover, .buy-btn:active {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
                }
                @media (max-width: 768px) {
                    body {
                        padding: 10px;
                    }
                    .plants-container {
                        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                        gap: 15px;
                        padding: 0 5px;
                    }
                    .plant-card {
                        padding: 15px;
                        min-height: 400px;
                    }
                    .plant-card img {
                        margin-bottom: 12px;
                    }
                    .header {
                        margin-bottom: 25px;
                    }
                }
                @media (max-width: 480px) {
                    .plants-container {
                        grid-template-columns: 1fr;
                        gap: 12px;
                        padding: 0;
                    }
                    .plant-card {
                        margin: 0 5px;
                        padding: 12px;
                        min-height: 380px;
                        border-radius: 15px;
                    }
                    .plant-card img {
                        margin-bottom: 10px;
                        padding: 6px;
                    }
                    .header {
                        margin-bottom: 20px;
                        padding: 0 5px;
                    }
                    .footer {
                        margin-top: 30px;
                        padding: 15px 5px;
                    }
                }
                @media (max-width: 360px) {
                    .plant-card {
                        margin: 0;
                        padding: 10px;
                        min-height: 360px;
                    }
                    .plant-card img {
                    }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🌿 Mariyam's Gardens Plant Shop �</h1>
                <p>Bring nature into your home with our beautiful collection of indoor plants</p>
            </div>
            <div class="plants-container">
    `;

  plants.forEach((plant) => {
    plantsHtml += `
            <div class="plant-card">
                <img src="${plant.imageUrl}" alt="${plant.name}">
                <h2>${plant.name}</h2>
                <div class="price">$${plant.price.toFixed(2)}</div>
                <p class="description">${plant.description}</p>
                <div class="care-info">
                    <strong>Care:</strong> ${plant.care}
                </div>
                <button class="buy-btn" onclick="alert('Thank you for your interest! Contact us to purchase this beautiful ${
                  plant.name
                }.')">
                    Add to Cart 🛒
                </button>
            </div>
        `;
  });

  plantsHtml += `
            </div>
            <div class="footer">
                <p>🌱 Thank you for choosing Mariyam's Gardens! 🌱</p>
                <p>Contact us: plants@greenparadise.com | 📞 (555) 123-GROW</p>
            </div>
        </body>
        </html>
    `;

  res.send(plantsHtml);
});

app.listen(port, () => {
  console.log(`QR Redirect App listening at ${baseUrl}`);
  console.log(`Generate QR code at: ${baseUrl}/generate-qr`);
  console.log(
    `The QR code will lead to the plants listing page: ${qrCodeTargetUrl}`
  );
});
