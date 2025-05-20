import csv from 'csv-parser'
import path from "path"
import { createReadStream } from 'fs'
import { ICrossword } from "@/lib/crossword.interface"
import { notFound } from 'next/navigation'

const re = new RegExp(/.*?(\d+).*?:(.*?)\((.*)\)/);

function parseRow(row: Record<string, string>): undefined | ICrossword {
  const parts = re.exec(row['VideoTitle']);
  if (!parts) {
    console.error(`Couldn't parse: ${row['VideoTitle']}`);
    return;
  }
  const reGroups = parts.slice(1).map((x) => x.trim());

  return {
    videoId: row['VideoId'],
    videoDuration: row['VideoDuration'],
    dayNo: Number.parseInt(reGroups[0], 10),
    question: reGroups[1],
    ansLen: reGroups[2]
      .split(",")
      .map((x) => x.trim())
      .map((x) => Number.parseInt(x, 10))
  }
}

export async function getCrossword(dayNo: number | string): Promise<ICrossword> {
  const filePath = path.join(process.cwd(), 'data/videos.csv');

  return new Promise((resolve, reject) => {
    createReadStream(filePath)
      .pipe(csv(['VideoId', 'VideoDuration', 'VideoTitle']))
      .on('data', (row) => {
        const d = parseRow(row)
        if (!d) return;

        if (d.dayNo.toString() === dayNo.toString())
          resolve(d)
      })
      .on('end', () => reject(notFound()))
      .on('error', (error) => reject(error));
  });
}

export async function getCrosswords(): Promise<ICrossword[]> {
  const crosswords: ICrossword[] = [];
  const filePath = path.join(process.cwd(), 'data/videos.csv');

  return new Promise((resolve, reject) => {
    createReadStream(filePath)
      .pipe(csv(['VideoId', 'VideoDuration', 'VideoTitle']))
      .on('data', (row) => {
        const d = parseRow(row)
        if (!d) return;

        crosswords.push(d);
      })
      .on('end', () => resolve(crosswords))
      .on('error', (error) => reject(error));
  });
}

export async function getCorrectAnswer(dayNo: number | string): Promise<string> {
  const filePath = path.join(process.cwd(), 'data/answers.csv');

  return new Promise((resolve, reject) => {
    createReadStream(filePath)
      .pipe(csv(['DayNo', 'Answer']))
      .on('data', (row) => {
        if (row['DayNo'] === dayNo.toString())
          resolve(row['Answer'])
      })
      .on('end', () => resolve(''))
      .on('error', (error) => reject(error));
  });
}
