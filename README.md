# Taipei Trash Map

## Policy

如果有任何問題

- 請善用 ISSUE/PR
- 請填寫表單 (給不會用 Github 的人)

If any questions/suggestions

- Please submit ISSUE/PR
- Submit the form (for non-Github user)

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
bunx wrangler kv key put data --binding data_trashcar --path trashcar.json --local
bunx wrangler kv key put data --binding data_trashcar --path trashcar.json
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
