const express = require("express");
const qrcode = require("qrcode");
const path = require("path");

const app = express();
const port = 5000;

// This will be the public URL of your application once deployed.
// For local testing, it will be http://localhost:3000
const baseUrl = `http://localhost:${port}`;

// The URL that the QR code will point to
const qrCodeTargetUrl = `${baseUrl}/plants-listing`;

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
  {
    name: "Fiddle Leaf Fig",
    price: 60.0,
    imageUrl: "/images/image4.jpg",
    description:
      "The Instagram-famous tree that adds dramatic height and elegance to any modern living space.",
    care: "Bright indirect light, water weekly",
  },
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
  {
    name: "Philodendron Heartleaf",
    price: 22.0,
    imageUrl: "/images/image8.jpg",
    description:
      "Cascading heart-shaped leaves that grow quickly and forgive forgotten waterings.",
    care: "Medium light, water weekly",
  },
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
        <title>Green Paradise Plant Shop</title>
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
                padding: 20px;
            }
            .container {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                padding: 50px;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                max-width: 600px;
            }
            h1 { 
                font-size: 3.5em; 
                margin-bottom: 20px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            p { 
                font-size: 1.3em; 
                margin-bottom: 30px;
                opacity: 0.9;
                line-height: 1.6;
            }
            .btn {
                display: inline-block;
                background: linear-gradient(45deg, #4CAF50, #66BB6A);
                color: white;
                padding: 15px 30px;
                border-radius: 25px;
                text-decoration: none;
                font-weight: bold;
                margin: 10px;
                transition: all 0.3s ease;
                font-size: 1.1em;
            }
            .btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 25px rgba(76, 175, 80, 0.4);
            }
            .plant-emoji {
                font-size: 4em;
                margin-bottom: 20px;
                display: block;
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
                <title>QR Code - Green Paradise Plant Shop</title>
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
                        padding: 20px;
                    }
                    .container {
                        background: white;
                        padding: 40px;
                        border-radius: 20px;
                        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                        color: #333;
                        max-width: 500px;
                    }
                    .qr-code { 
                        border: 3px solid #4CAF50;
                        padding: 20px; 
                        background-color: white; 
                        margin: 30px 0;
                        border-radius: 15px;
                        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                    }
                    h1 { 
                        color: #2E7D32; 
                        margin-bottom: 20px;
                        font-size: 2em;
                    }
                    p { 
                        font-size: 1.1em; 
                        color: #666;
                        line-height: 1.6;
                        margin-bottom: 15px;
                    }
                    a { 
                        color: #4CAF50; 
                        text-decoration: none; 
                        font-weight: bold;
                    }
                    a:hover { 
                        text-decoration: underline; 
                    }
                    .plant-emoji {
                        font-size: 3em;
                        margin-bottom: 20px;
                        display: block;
                    }
                    .instructions {
                        background: #E8F5E8;
                        padding: 20px;
                        border-radius: 10px;
                        margin-top: 20px;
                        border-left: 4px solid #4CAF50;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <span class="plant-emoji">🌿</span>
                    <h1>Green Paradise Plant Shop</h1>
                    <p>Scan the QR code below to browse our beautiful plant collection!</p>
                    <img class="qr-code" src="${qrCodeDataUrl}" alt="QR Code to Plant Collection">
                    <div class="instructions">
                        <p><strong>How to use:</strong></p>
                        <p>1. Open your phone's camera app</p>
                        <p>2. Point it at the QR code above</p>
                        <p>3. Tap the notification to visit our plant shop</p>
                    </div>
                    <p style="margin-top: 20px;">
                        Or visit directly: <a href="${qrCodeTargetUrl}">${qrCodeTargetUrl}</a>
                    </p>
                </div>
            </body>
            </html>
        `);
  } catch (err) {
    console.error("Error generating QR code:", err);
    res.status(500).send("Error generating QR code.");
  }
});

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
                    padding: 20px;
                    color: #333;
                }
                .header {
                    text-align: center;
                    margin-bottom: 40px;
                    color: white;
                }
                .header h1 { 
                    font-size: 3em; 
                    margin-bottom: 10px;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                }
                .header p {
                    font-size: 1.2em;
                    opacity: 0.9;
                }
                .plants-container { 
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 30px;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .plant-card { 
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    padding: 25px;
                    text-align: center;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
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
                    transform: translateY(-10px) scale(1.02);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                }
                .plant-card img { 
                    width: 100%;
                    height: 200px;
                    object-fit: contain;
                    border-radius: 15px;
                    margin-bottom: 20px;
                    background: #f8f9fa;
                    padding: 10px;
                }
                .plant-card h2 { 
                    color: #2E7D32;
                    font-size: 1.5em;
                    margin-bottom: 10px;
                    font-weight: 600;
                }
                .plant-card .price { 
                    font-weight: bold;
                    color: #1B5E20;
                    font-size: 1.8em;
                    margin-bottom: 15px;
                    background: linear-gradient(45deg, #4CAF50, #66BB6A);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .plant-card .description {
                    color: #666;
                    line-height: 1.5;
                    margin-bottom: 15px;
                    font-size: 0.95em;
                }
                .plant-card .care-info {
                    background: #E8F5E8;
                    padding: 10px;
                    border-radius: 10px;
                    color: #2E7D32;
                    font-size: 0.9em;
                    font-weight: 500;
                }
                .footer {
                    text-align: center;
                    margin-top: 50px;
                    color: white;
                    opacity: 0.8;
                }
                .buy-btn {
                    background: linear-gradient(45deg, #4CAF50, #66BB6A);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 25px;
                    font-weight: bold;
                    cursor: pointer;
                    margin-top: 15px;
                    transition: all 0.3s ease;
                    font-size: 1em;
                }
                .buy-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
                }
                @media (max-width: 768px) {
                    .plants-container {
                        grid-template-columns: 1fr;
                    }
                    .header h1 {
                        font-size: 2.2em;
                    }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🌿 Green Paradise Plant Shop �</h1>
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
                <p>🌱 Thank you for choosing Green Paradise! 🌱</p>
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
