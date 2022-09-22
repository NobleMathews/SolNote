use anchor_lang::prelude::*;

declare_id!("3aoo9RF3FdfzrRnpYQawfxEYWkZMNCwQDyXU2evDzKvg");

#[error_code]
pub enum ErrorCode {
    #[msg("The provided content should not be longer than 500 characters")]
    ContentTooLong,
}

#[program]
pub mod solana_notepad {
    use super::*;

    pub fn send_note(ctx: Context<SendNote>, content: String) -> Result<()> {
        let note: &mut Account<Note> = &mut ctx.accounts.note;
        let author: &Signer = &&ctx.accounts.author;
        let clock: Clock = Clock::get().unwrap();

        if content.chars().count() > 500 {
            return Err(ErrorCode::ContentTooLong.into())
        }

        note.author = *author.key;
        note.timestamp = clock.unix_timestamp;
        note.content = content;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct SendNote<'info> {
    #[account(init, payer = author, space = Note::LEN)]
    pub note: Account<'info, Note>,
    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// 1. Define the structure of the Note account.
#[account]
pub struct Note {
    pub author: Pubkey,
    pub timestamp: i64,
    pub content: String,
}

// 2. Add some useful constants for sizing propeties.
const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4; // Stores the size of the string.
const MAX_CONTENT_LENGTH: usize = 500 * 4; // 280 chars max.

// 3. Add a constant on the Note account that provides its total size.
impl Note {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author.
        + TIMESTAMP_LENGTH // Timestamp.
        + STRING_LENGTH_PREFIX + MAX_CONTENT_LENGTH; // Content.
}
