#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const QRCode = require('qrcode')

function usage() {
  console.log('Usage: node scripts/generate-qr.js --url=<url> --name=<outputPathWithoutExt> --logo=<logoSvgPath> --logoSize=<0-1> --includeBackground')
  process.exit(1)
}

const args = process.argv.slice(2)
const opts = {}
for (const a of args) {
  if (a.startsWith('--')) {
    const [k, v] = a.slice(2).split('=')
    opts[k] = v === undefined ? true : v
  }
}

const url = opts.url || 'https://bcwildwatch.co.za'
const name = opts.name || 'public/BC Wild Watch QRCode'
const logoPath = opts.logo || 'public/BC Wild Watch Logo.svg'
const logoSize = parseFloat(opts.logoSize || '0.25')
const includeBackground = !!opts.includeBackground

async function run() {
  try {
    // Ensure output dir exists
    const outDir = path.dirname(name)
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

    if (!fs.existsSync(logoPath)) {
      console.warn(`Logo not found at ${logoPath}. Proceeding without a logo.`)
    }

    // Generate PNG data URL
    const dataUrl = await QRCode.toDataURL(url, { errorCorrectionLevel: 'H', margin: 0, scale: 10 })
    const base64 = dataUrl.split(',')[1]
    const pngBuffer = Buffer.from(base64, 'base64')
    const pngOut = `${name}.png`
    fs.writeFileSync(pngOut, pngBuffer)
    console.log(`Wrote ${pngOut}`)

    // Read logo svg content (if available)
    let logoSvg = null
    if (fs.existsSync(logoPath)) {
      logoSvg = fs.readFileSync(logoPath, 'utf8')
      // strip XML declaration if present
      logoSvg = logoSvg.replace(/<\?xml[\s\S]*?\?>/g, '')
    }

    // Build SVG wrapper
    const viewSize = 1024
    const logoWidth = Math.round(viewSize * logoSize)
    const logoX = Math.round((viewSize - logoWidth) / 2)
    const logoY = logoX

    const svgParts = []
    svgParts.push(`<?xml version="1.0" encoding="UTF-8"?>`)
    svgParts.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewSize} ${viewSize}">`)
    if (includeBackground) svgParts.push(`<rect width="${viewSize}" height="${viewSize}" fill="white" />`)
    svgParts.push(`<image width="${viewSize}" height="${viewSize}" href="data:image/png;base64,${base64}" preserveAspectRatio="xMidYMid meet" />`)

    if (logoSvg) {
      // Insert logo centered
      svgParts.push(`<g transform="translate(${logoX},${logoY}) scale(${logoWidth / viewSize})">`)
      // Ensure svg children only (remove outer svg wrapper if present)
      const inner = logoSvg.replace(/^[\s\S]*?<svg[^>]*>/i, '').replace(/<\/svg>[\s\S]*$/i, '')
      svgParts.push(inner)
      svgParts.push(`</g>`)
    }

    svgParts.push(`</svg>`)

    const svgOut = `${name}.svg`
    fs.writeFileSync(svgOut, svgParts.join('\n'), 'utf8')
    console.log(`Wrote ${svgOut}`)
  } catch (err) {
    console.error(err)
    process.exit(2)
  }
}

run()
