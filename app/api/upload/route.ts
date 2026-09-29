import { NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import { randomUUID } from "crypto";

const storage = new Storage({
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  credentials: {
    client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n"
    ),
  },
});

const bucketName = "osdragomilovicnews";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: "Fajl nije poslat.",
        },
        {
          status: 400,
        }
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Dozvoljeni formati su JPG, PNG i WEBP.",
        },
        {
          status: 400,
        }
      );
    }

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Slika može imati najviše 5 MB.",
        },
        {
          status: 400,
        }
      );
    }

    const safeFilename = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, "-");

    const imagePath =
      `news/${randomUUID()}-${safeFilename}`;

    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    const bucket =
      storage.bucket(bucketName);

    const storageFile =
      bucket.file(imagePath);

    await storageFile.save(buffer, {
      metadata: {
        contentType: file.type,
      },

      resumable: false,
    });

    return NextResponse.json({
      success: true,
      imagePath,
    });
  } catch (error) {
    console.error(
      "UPLOAD ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Upload slike nije uspio.",
      },
      {
        status: 500,
      }
    );
  }
}