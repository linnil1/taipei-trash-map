# Taipei Trash Map

## Policy

If any bugs/questions/suggestions founded,

Please submit ISSUE/PR in English or Tranditional-Chinese

## Develop/Deploy

### init

```bash
bun install
bunx wrangler kv namespace create data_trashcar
# change apiKey in src/lib/Map.svelte
vim src/lib/Map.svelte
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
```
