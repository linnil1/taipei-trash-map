# Taipei Trash Map

## Policy

If any bugs/questions/suggestions founded,

Please submit ISSUE/PR in English or Tranditional-Chinese

## Develop/Deploy

### Caution

- This website uses Svelte version 5 (latest as of 2024/10/28).
- Although TypeScript (TS) is used, none are explicitly annotated by me.
- cloudflare/workerd is not compatible with Bun; npm is used instead.
- No tested/lint are used currently.

### init

```bash
bun install
bunx wrangler kv namespace create data_trashcar
# Add google maps' API_KEY
# PUBLIC_GOOGLE_MAP_API_KEY=xxx
vim .env
```

### Update data

```bash
python fetch_trashcar.py
bunx wrangler kv key put --binding data_trashcar data --path trashcar.json --local
bunx wrangler kv key put --binding data_trashcar info --path trashcar_info.json --local
bunx wrangler kv key put --binding data_trashcar data --path trashcar.json
bunx wrangler kv key put --binding data_trashcar info --path trashcar_info.json
```

### run

```bash
bun dev --port 5000
python fetch_trashcar.py --host
bunx wrangler dev --port 5000
```

### Deploy

```bash
bun run deploy
# or
bun run build
bunx wrangler pages deploy
```
