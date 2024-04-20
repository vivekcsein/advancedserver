import bcrypt from 'bcrypt';

// sync password async
export const hashPassword = (password: string) => {
    return new Promise((resolve, reject) => {
        const saltRounds = 12;
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) reject(err);
            else resolve(bcrypt.hash(password, salt, (err, hash) => {
                if (err) reject(err);
                else resolve(hash);
            }));
        });
    })
}

// sync method
export const hashPasswordSync = (password: string) => {
    return new Promise((resolve, reject) => {
        // Generate a salt at random
        const saltRounds = 12;
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) reject(err);
            else resolve([salt, bcrypt.hashSync(password, salt)]);
        });
    })
}

export const comparePassword = (password: string, hashed: string) => {
    return bcrypt.compare(password, hashed);
}