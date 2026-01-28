const Slot = require('../models/Slot');
const Token = require('../models/Token');

const PRIORITY_MAP = {
  EMERGENCY: 100,
  PAID: 80,
  FOLLOWUP: 60,
  ONLINE: 40,
  WALKIN: 30
};

function getPriority(type){
  return PRIORITY_MAP[type] || 10;
}

async function allocateToken(slotId, tokenData){
  const slot = await Slot.findById(slotId).populate('tokens');

  if(slot.tokens.length < slot.capacity){
    const token = await Token.create(tokenData);
    slot.tokens.push(token._id);
    await slot.save();
    return { status: 'ALLOCATED', token };
  }

  // displacement logic
  const sorted = slot.tokens.sort((a,b)=>a.priority-b.priority);
  const lowest = sorted[0];

  if(tokenData.priority > lowest.priority){
    await Token.findByIdAndDelete(lowest._id);
    const token = await Token.create(tokenData);
    slot.tokens = slot.tokens.filter(t=>t.toString()!==lowest._id.toString());
    slot.tokens.push(token._id);
    await slot.save();
    return { status: 'DISPLACED', token, displaced: lowest };
  }

  return { status: 'FULL', message: 'Slot full, redirected' };
}

module.exports = { allocateToken, getPriority };
