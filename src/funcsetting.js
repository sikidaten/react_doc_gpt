import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
const funcs = [
    {
        'name': 'invoice', 'description': "請求書から基本的な情報を抽出します", 'properties':
        {
            'total amount': "合計金額",
            "sender": "請求元会社名",
            "date": "請求書発行日",
            "tax amout": "税額",
            "invoice number": "請求書番号"
        }
    },
    {
        'name': '検査証明書', 'description': "検査証明書から基本的な情報を抽出します", 'properties':
        {
            'ProductName': "品名",
            "Size": "寸法",
            "Quantity": "数量",
            "VisualInspection": "外観検査結果",
            "DimensionInspection": "寸法検査結果"
        }
    },
];

export function FuncSetting({ setIsOpenSetting }) {
    return <>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton size='large' onClick={() => setIsOpenSetting(false)}>
                <CloseIcon fontSize="inherit" />
            </IconButton>
        </div>
        {
            funcs.map((func) => {
                return <div style={{ paddingBottom: "32px" }}>
                    <TextField
                        id="standard-helperText"
                        label="function name"
                        defaultValue={func.name}
                        variant="standard"
                    />
                    <br />
                    <TextField
                        fullWidth
                        id="standard-helperText"
                        label="function description"
                        defaultValue={func.description}
                        variant="standard"
                    />

                    <div style={{ padding: "16px" }}>
                        {
                            Object.entries(func.properties).map(([key, value]) => {
                                return <>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid size={2}>
                                                <TextField
                                                    id="standard-helperText"
                                                    label="item key name"
                                                    defaultValue={key}
                                                    variant="standard"
                                                />
                                            </Grid>
                                            <Grid size={2}>
                                                <TextField
                                                    id="standard-helperText"
                                                    label="item description"
                                                    defaultValue={value}
                                                    variant="standard"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </>
                            })
                        }
                    </div>
                </div>
            })}
    </>
}