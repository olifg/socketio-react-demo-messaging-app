import React, { Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react';
import styles from './login.module.sass';
import { v4 as uuidV4 } from 'uuid';
import { Snow } from '../Snow';




type LoginProps = {
    onIdSubmit: Dispatch<SetStateAction<string | undefined>>;
};

export const Login = ({ onIdSubmit }: LoginProps) => {
    const idRef = useRef<HTMLInputElement>(null)


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!idRef.current) return;
        onIdSubmit(idRef.current.value)
    }

    const createNewId = () => {
        onIdSubmit(uuidV4());
    }

    return (
        <>
            <Snow particleAmount={21} />
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <div className={styles.formTitle}>
                        <span className={styles.title}>Log in to your account</span>
                    </div>
                    <div className={styles.form}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.inputContainer}>
                                <input className={styles.loginInput} ref={idRef} type="text" placeholder="User Id" required />
                            </div>
                            <div className={styles.buttonContainer}>
                                <button className={styles.loginFormButton} type="submit">Log In</button>
                                <button className={styles.loginFormButton} onClick={createNewId}>Create a New ID</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div></>
    );
};

