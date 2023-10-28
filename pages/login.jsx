import react, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router"
import {
    withAuthenticator,
    Flex,
    Card,
    Text,
    TextField,
    TextAreaField,
    View,
    Button,
    Loader,
} from "@aws-amplify/ui-react";
import { Amplify, API, Auth, graphqlOperation } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { useForm } from "react-hook-form";
import chance from "chance"
import styles from "../styles/Home.module.css";

Amplify.Auth.configure({
    authenticationFlowType: "CUSTOM_AUTH",
});

export default function Login() {
    const router = useRouter()
    const [form, setForm] = useState("login")
    const [shouldReset, setShouldReset] = useState(false)
    const [cognitoUser, setCognitoUser] = useState()

    async function loginWithEmail(email) {
        const user = await Auth.signIn(email)
        setCognitoUser(user)
    }

    async function signup(email) {
        const chance = new Chance()
        const password = chance.string({ length: 16 })
        //const user = await Auth.signUp({username:email, password})


    }

    async function answerCustomChallenge(code) {
        // This will throw an error if it’s the 3rd wrong answer
        try {
            const challengeResult = await Auth.sendCustomChallengeAnswer(cognitoUser, code)

            if (challengeResult.challengeName) {
                secretCode.value = ''
                attemptsLeft.value = parseInt(challengeResult.challengeParam.attemptsLeft)

                alert(`The code you entered is incorrect. ${attemptsLeft.value} attempts left.`)
            }
            return challengeResult
        } catch (error) {
            alert('Too many failed attempts. Please try again.')
        }
    }

    async function onSubmit(data) {
        if (form === "login") {
            console.log("submit", data);
            loginWithEmail(data.email)
            setForm("code")
        }

        if (form === "signup") {
            console.log("submit", data);
            //signup

            //login
            setForm("code")
        }

        if (form === "code") {
            const result = await answerCustomChallenge(data.code)
            if (result.attributes.sub) {
                router.push('/messages')
            }
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Login</title>
                <meta name="description" content="Login form" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <LoginForm shouldReset={shouldReset} />
            </main>
        </div>
    )

    function LoginForm({ shouldReset }) {
        const {
            register,
            handleSubmit,
            reset,
            watch,
            setValue,
            formState: { errors },
        } = useForm({
            defaultValues: {
                email: "",
                code: "",
            },
        });

        useEffect(() => {
            if (shouldReset) {
                reset()
            }
        }, [shouldReset, reset])


        return (
            <Flex width={"100%"} alignItems={"center"} direction={"column"}>
                <form className={styles.metadataForm} onSubmit={handleSubmit(onSubmit)}>
                    <Flex gap={"10px"} alignItems={"center"} direction={"column"}>
                        <Card width={"100%"} variation="outlined" paddingBottom={"30px"}>
                            <Flex width={"100%"} justifyContent={"center"}>
                                <Text padding="20px 0px" fontSize={"xl"} fontWeight={"bold"}>
                                    Login
                                </Text>
                            </Flex>

                            {
                                form === "login" && (
                                    <View>
                                        <TextField id="email" type="email" label="Email" {...register("email", { required: true })} />
                                        {errors.email && <span className={styles.error}>email is required</span>}
                                    </View>
                                )
                            }

                            {
                                form === "signup" && (
                                    <View>
                                        <TextField id="email" type="email" label="Email" {...register("email", { required: true })} />
                                        {errors.email && <span className={styles.error}>email is required</span>}
                                    </View>
                                )
                            }

                            {
                                form === "code" && (
                                    <View>
                                        <TextField
                                            className={styles.metadata}
                                            id="code"
                                            type="text"
                                            label="Code from email"
                                            {...register("code", { required: true })}
                                        />
                                        {errors.code && <span className={styles.error}>Code is required</span>}
                                    </View>
                                )
                            }

                        </Card>
                        <Button className={styles.formButton} variation="primary" type="submit" value="save">
                            {form === "login" ? "Login" : "Enter Code"}
                        </Button>
                    </Flex>
                </form>
            </Flex>
        )
    }
}
