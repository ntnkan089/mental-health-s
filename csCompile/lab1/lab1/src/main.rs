use std::error::Error;
use std::fs;
use std::iter::Peekable;
use std::vec::IntoIter;

#[derive(Debug)]
enum Tok {
    Ass,
}

struct Lex {
    it: Peekable<IntoIter<u8>>,
    line: usize,
    problem: Option<Box<dyn Error>>,
}

impl Lex {
    fn make(file_path: &str) -> Result<Lex, Box<dyn Error>> {
        Ok(Lex {
            it: std::fs::read_to_string(file_path)?
                .into_bytes()
                .into_iter()
                .peekable(),
            line: 0,
            problem: None,
        })
    }

    fn lex(&mut self) -> Option<Tok> {
        let byte = self.it.peek()?;
        self.it.next();

        Some(Tok::Ass)
    }
}

fn main() -> Result<(), Box<dyn Error>> {
    let args: Vec<String> = std::env::args().collect();
    let mut lex = Lex::make(&args[1])?;
    while let Some(tok) = lex.lex() {
        println!("{:?}", tok);
    }
    //

    Ok(())
}
//
