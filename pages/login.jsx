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
    Tabs,
    TabItem
} from "@aws-amplify/ui-react";
import { Amplify, API, Auth, graphqlOperation } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { useForm } from "react-hook-form";
import chance from "chance"
import Cookies from 'js-cookie';
import styles from "../styles/Home.module.css";




export default function Login() {
    const router = useRouter()
    const [formState, setFormState] = useState("login")
    const [tabIndex, setTabIndex] = useState(0)
    const [shouldReset, setShouldReset] = useState(false)
    const [cognitoUser, setCognitoUser] = useState(null)
    const [isSigningIn, setIsSigningIn] = useState(false)

    async function loginWithEmail(email) {
        try {

            const user = await Auth.signIn(email)
            setCognitoUser(user)

        } catch (err) {
            console.log(err);
        }
    }

    async function signup(email) {
        const chance = new Chance()
        const password = chance.string({ length: 16 })
        const user = await Auth.signUp({ username: email, password })
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
        if (formState === "login") {
            console.log("submit", data);
            await loginWithEmail(data.email)
            setFormState("code")
        } else if (formState === "signup") {
            console.log("submit", data);
            //signup
            await signup(data.email)
            setTabIndex(0)
            loginWithEmail(data.email)
            //login
            setFormState("code")
        } else if (formState === "code") {
            setIsSigningIn(true)
            const result = await answerCustomChallenge(data.code)
            if (result.attributes.sub) {
                const session = await Auth.currentSession();
                const clientId = session.getAccessToken().payload.client_id
                const email = session.getIdToken().payload.email
                console.log("email", email);
                const provider = "CognitoIdentityServiceProvider"
                const root = `${provider}.${clientId}.${email}`
                console.log("root", root);
                const lastAuthUser = `${provider}.${clientId}.LastAuthUser`
                const accessToken = `${root}.accessToken`
                const refreshToken = `${root}.refreshToken`
                const idToken = `${root}.idToken`

                //Cookies.set(idToken, session.getIdToken().getJwtToken(), { expires: 365 });
                //Cookies.set(accessToken, session.getAccessToken().getJwtToken(), { expires: 365 });
                //Cookies.set(refreshToken, session.getRefreshToken().getToken(), { expires: 365 });
                Cookies.set(lastAuthUser, email, { expires: 365 });
                router.push(window.localStorage.getItem("redirectPath"))
            }
        } else {
            setFormState("login")
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
                <LoginForm isSigningIn={isSigningIn} shouldReset={shouldReset} />
            </main>
        </div>
    )

    function LoginForm({ shouldReset, isSigningIn }) {
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

        function tabChange(index) {

            if (index === "0") {
                setTabIndex("0")
                setFormState("login")
            }

            if (index === "1") {

                setTabIndex("1")
                setFormState("signup")
            }

        }


        return (
            <Flex width={"100%"} alignItems={"center"} direction={"column"}>
                <form className={styles.metadataForm} onSubmit={handleSubmit(onSubmit)}>
                    <Flex gap={"10px"} alignItems={"center"} direction={"column"}>
                        <Card width={"100%"} variation="outlined" paddingBottom={"30px"}>
                            <Flex width={"100%"} justifyContent={"center"}>
                                <Tabs currentIndex={tabIndex} onChange={(i) => tabChange(i)} >
                                    <TabItem title="Login">
                                        <Text padding="20px 0px" fontSize={"xl"} fontWeight={"bold"}>
                                            Login
                                        </Text>
                                    </TabItem>
                                    <TabItem title="Signup">
                                        <Text padding="20px 0px" fontSize={"xl"} fontWeight={"bold"}>
                                            Signup
                                        </Text>
                                    </TabItem>
                                </Tabs>
                            </Flex>

                            {
                                formState === "login" && (
                                    <View>
                                        <TextField id="email" type="email" label="Email" {...register("email", { required: true })} />
                                        {errors.email && <span className={styles.error}>email is required</span>}
                                    </View>
                                )
                            }

                            {
                                formState === "signup" && (
                                    <View>
                                        <TextField id="email" type="email" label="Email" {...register("email", { required: true })} />
                                        {errors.email && <span className={styles.error}>email is required</span>}
                                    </View>
                                )
                            }

                            {
                                formState === "code" && (
                                    <View>
                                        <TextField
                                            className={styles.metadata}
                                            id="code"
                                            type="text"
                                            label="Enter code from email"
                                            {...register("code", { required: true })}
                                        />
                                        {errors.code && <span className={styles.error}>Code is required</span>}
                                    </View>
                                )
                            }

                        </Card>
                        <Button minHeight={"42px"} width={"250px"} className={styles.formButton} variation="primary" type="submit" value="save">
                            {formState === "login" ? "login" : tabIndex === "1" ? "Signup" : isSigningIn ? <Loader /> : "Submit Code"}
                        </Button>
                    </Flex>
                </form>
            </Flex>
        )
    }
}
