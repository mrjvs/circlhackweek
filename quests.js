const newUserFS = [
    {
        type: "dir",
        name: "logs",
        contents: [

        ]
    },
    {
        type: "dir",
        name: "bin",
        contents: [
            {
                type: "file",
                name: "porthack.exe",
                contents: "RUN1"
            },
            {
                type: "file",
                name: "clock.exe",
                contents: "RUN2"
            },
            {
                type: "file",
                name: "sqlinject.exe",
                contents: "RUN3"
            }
        ]
    },
    {
        type: "dir",
        name: "home",
        contents: [
            {
                type: "file",
                name: "welcome_to_circl.txt",
                contents: "hi :)"
            }
        ]
    },
    {
        type: "dir",
        name: "sys",
        contents: []
    }
]

module.exports = {
    newUserFS
}