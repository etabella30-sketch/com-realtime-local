// const incomingBuffer = 02460003024e030302540000000003

while (index < incomingBuffer.length) {
  if (incomingBuffer[index] === 0x02) { // Start of command
    // const command = String.fromCharCode(incomingBuffer[index + 1]);
    let endIndex = incomingBuffer.indexOf(0x03, index); // Find end of command
    if (endIndex === -1) break; // If no end found, wait for more data
    const commandData = incomingBuffer.slice(index + 2, endIndex);
    // this.handleCommand(command, commandData, currentJob, currentSession);
    index = endIndex + 1; // Move to the next command
  } else if (incomingBuffer[index] !== 0x03) { // Skip 0x03 and add valid data
    // this.handleText(incomingBuffer[index], currentJob);
    index++;
  } else {
    index++;
  }
}