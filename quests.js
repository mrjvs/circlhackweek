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
                name: "portHack.exe",
                contents: "1234567890" // ???
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
        contents: [{}]
    } 
]

module.exports = {
    newUserFS
}