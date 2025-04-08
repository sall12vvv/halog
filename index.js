const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const cron = require('node-cron');

const callLogs = {};
const jamMulai = 22;
const jamAkhir = 6;

function dalamWaktuBlokir() {
  const jam = new Date().getHours();
  return (jam >= jamMulai || jam < jamAkhir);
}

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');
  const { version } = await fetchLatestBaileysVersion();
  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: true
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('call', async (calls) => {
    for (const call of calls) {
      if (call.status === 'offer' && call.isVideo && dalamWaktuBlokir()) {
        const id = call.from;
        const name = sock.contacts[id]?.name || id.split('@')[0]; // Ambil nama atau ID

        console.log(`VC dari ${name} (${id}) ditolak.`);

        await sock.rejectCall(call.id, id);

        await sock.sendMessage(id, {
          text: `Hai ${name}, maaf video call kamu ditolak otomatis karena sedang dalam waktu larangan panggilan.`
        });

        callLogs[id] = (callLogs[id] || 0) + 1;

        if (callLogs[id] > 3) {
          await sock.updateBlockStatus(id, "block");
          console.log(`${name} (${id}) diblokir karena spam VC.`);
        }
      }
    }
  });
}

startBot();
