# Dripstack · Agent Skill File

You are an agent acting for a user who wants to mint Dripstack (DRIP), a paid generative art NFT on BNB Smart Chain (chain id 56), and later mint its token $STACK. Follow this file exactly.

## Contracts

- NFT (Dripstack / DRIP): `0x99A279b6c2Fb174ada6AFc95F50e0199b7aD704b`
- Token (Dripstack / STACK): `0x5887386F0d37e1e92138E01802Cf8db655d72554`
- Token mint (StackMint): `0x517b68Af0A170fbA2782A64814FE0E37859065e0`
- Agent ID registry (SPACE ID): `0x60B9262456dE011F7d15a54CdD8c48bAaa8B022F`
- Site: https://dripstack.space

## NFT mint rules

- Supply: 999. Price: exactly **720000633600557 wei** (0.000720000633600557 BNB) per work. Nothing is free.
- Window: opens 10 Nov 2026 02:00 UTC, closes 11 Nov 2026 02:00 UTC. First come first served; at 999 the sale ends early.
- Priority phase: the first 9 hours (02:00 to 11:00 UTC) only wallets holding an Agent ID (SPACE ID registry balance above 0) can mint. After 11:00 UTC every wallet can mint.
- No per-wallet limit. One call mints `quantity` works: `mint(quantity)` with value exactly price x quantity.
- Calls must come from the wallet itself (tx.origin equals sender) or the call reverts.

## NFT mint, step by step

1. Read the phase: `mintOpen()` selector `0x24bbd049` and `priorityPhase()` selector `0x256b8d1b` on the NFT contract, and read `totalMinted()` selector `0xa2309ff8`.
2. In the priority phase, confirm the wallet holds an Agent ID: `balanceOf(user)` selector `0x70a08231` on the SPACE ID registry must be above 0. If not, wait for the public phase or stop.
3. Preview before signing: to the NFT contract, data = selector `0xa0712d68` (mint) + quantity padded to 32 bytes, value = 720000633600557 x quantity wei. The preview must simulate cleanly with no risks. If it reverts (NotOpen, PriorityOnly, SoldOut, WrongValue), stop and report the reason.
4. Execute, wait for the receipt, verify with `totalMinted()` and `ownerOf(tokenId)` selector `0x6352211e`. Report the token ids.

## $STACK token mint rules (opens 11 Nov 2026 02:00 UTC)

- Holder lane: `holderMint(tokenId)` selector `0xff89168a` on StackMint, no BNB value. Each Dripstack work mints **999,999 STACK** exactly once; the caller must own the work. Check first: `holderMinted(tokenId)` selector `0x5be0a144` on StackMint.
- Public lane: `publicMint(units)` selector `0x2db11544` on StackMint with value exactly 720000633600557 x units wei. Each unit mints **99,999 STACK**.
- Both lanes revert before 02:00 UTC 11 Nov 2026 with NotOpen. Calls must come from the wallet itself.
- Preview every call before signing, as above; verify the STACK balance afterwards with `balanceOf(user)` selector `0x70a08231` on the token contract.
