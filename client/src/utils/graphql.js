import gql from 'graphql-tag'

export const IS_LOGIN = gql`
    {
        isLogin
    }
`

export const ME = gql`
    {
        me{
            firstName
            lastName
        }
    }
`

export const SIGN_UP = gql`
    mutation signup($input: RegisterInput!) {
        signup(input: $input)
    }
`

export const LOGIN = gql`
    mutation login($login: String!, $pwd: String!){
        login(login: $login, pwd: $pwd)
    }
`

export const LOGOUT = gql`
    mutation logout{
        logout
    }
`

export const ALL_PLAYERS = gql`
    {
        allPlayers{
            id
            name
            img
            misc
            elo
        }
    }
`

export const TWO_PLAYERS = gql`
    {
        twoPlayers{
            id
            name
            img
        }
    }
`

export const VERSUS_PLAYERS = gql`
    mutation versusPlayers($idPlayer1: ID!, $idPlayer2: ID!, $player1Win: Boolean!){
        versusPlayers(idPlayer1: $idPlayer1, idPlayer2: $idPlayer2, player1Win: $player1Win){
            id
        }
    }
`
