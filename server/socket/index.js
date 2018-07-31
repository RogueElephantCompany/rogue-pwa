
module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
    socket.on('invite', data => {
      io.sockets.emit('invite', data)
    })
    socket.on('end-call', data => {
      io.sockets.emit('end-call', data)
    })
    socket.on('reject-call', data => {
      io.sockets.emit('reject-call', data)
    })
  })
}
