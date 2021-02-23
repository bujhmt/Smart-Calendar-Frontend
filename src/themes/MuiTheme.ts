import { createMuiTheme } from '@material-ui/core/styles'

export const MuiTheme = createMuiTheme({
    props: {
        MuiButton: {
            disableElevation: true,
        },
    },
    overrides: {
        MuiAppBar: {
            colorPrimary: { color: '#fff', backgroundColor: '#ef6c00' },
            root: {
                height: 80,
                alignItems: 'center',
            },
        },
        MuiToolbar: {
            regular: {
                minHeight: '80px !important',
                width: '100%',
            },
            root: {
                justifyContent: 'space-between',
            },
        },
        MuiIconButton: {
            edgeStart: {
                marginLeft: '15px ',
            },
        },
        MuiButton: {
            root: {
                fontSize: '1.05rem ',
                fontFamily: 'Ubuntu',
            },
        },
        MuiButtonBase: {
            root: {},
        },
        MuiFormControl: {
            root: {
                marginRight: 20,
            },
        },
        MuiDialogContent: {
            root: {
                overflowX: 'hidden',
            },
        },
        MuiDialogTitle: {
            root: {
                margin: 'auto',
                marginTop: 10,
            },
        },
        MuiTypography: {
            body1: {
                width: '100%',
            },
        },
        MuiFormHelperText: {
            contained: {
                margin: '0 !important',
            },
            root: {
                backgroundColor: '#fff',
            },
        },
    },
})
