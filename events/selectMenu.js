const { Events, EmbedBuilder } = require('discord.js');
const { randomColor } = require('../functions/randomColor');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isStringSelectMenu()) return;
		if (!interaction.inGuild()) {
			await interaction.reply("Don't try to casually slide into my DM! Add me to your server in order to use my commands.");
			return;
        }

		const chapter = interaction.customId;
		const relic = interaction.values[0];

		const embed = new EmbedBuilder()
			.setImage(RELICS[chapter][relic])
			.setTimestamp()
			.setFooter({ text: 'nepnep#1358', iconURL: 'https://store.playstation.com/store/api/chihiro/00_09_000/container/BE/nl/19/EP0031-CUSA03124_00-AV00000000000037/image?w=320&h=320&bg_color=000000&opacity=100&_version=00_09_000' })
			.setColor(randomColor());

		await interaction.update({ embeds: [embed] });
		return;
    }
}


const RELICS = [
	[
		'https://www.prydwen.gg/static/0ba34003f9bdec64a7ffac7232e71322/7dccd/ch1_1.webp',
	 	'https://www.prydwen.gg/static/85eed1cc6b3d0432953ad9a967ebfd56/7dccd/ch1_2.webp',
		'https://www.prydwen.gg/static/a2a32ec752d849813a7c617ee5d845b1/7dccd/ch1_3.webp',
	],
	[
		'https://www.prydwen.gg/static/fbc66faf1dd77dfcc896c7e6c0e5f035/7dccd/ch2_1.webp',
		'https://www.prydwen.gg/static/c7efc951c353cf3873b55fe95d471600/7dccd/ch2_2.webp',
		'https://www.prydwen.gg/static/4091e38a21be6490dd44cb9e9ad6fe2e/7dccd/ch2_3.webp',
		'https://www.prydwen.gg/static/60aeaefab45c832b62d3d5f68d3c3302/7dccd/ch2_4.webp',
		'https://www.prydwen.gg/static/9bb901b5a93e464ca964793c12ace34d/7dccd/ch2_5.webp',
	],
	[
		'https://www.prydwen.gg/static/db4fe5a949cc6b8fd97e6decffaa3bcc/7dccd/ch3_1.webp',
		'https://www.prydwen.gg/static/64acb338f8290d4383fcf1266f45a86c/7dccd/ch3_2.webp',
		'https://www.prydwen.gg/static/0be84ce3eabf7a1c82f68b53973b103a/7dccd/ch3_3.webp',
		'https://www.prydwen.gg/static/a716849a0f5191de9d227bff1ef40c18/7dccd/ch3_4.webp',
		'https://www.prydwen.gg/static/dcb7f48b00f01e068ce47da35ffd1980/7dccd/ch3_5.webp',
		'https://www.prydwen.gg/static/9634d8ffb29864e979cff544a600fe95/7dccd/ch3_6.webp',
		'https://www.prydwen.gg/static/351c6cff919f0f38ae4ce3c13cddddf6/7dccd/ch3_7.webp',
		'https://www.prydwen.gg/static/414f94caa210bd0b18511a2b74b61145/7dccd/ch3_8.webp',
		'https://www.prydwen.gg/static/0c6cb94d6b894e9b8cc94776752c9ddf/7dccd/ch3_9.webp',
		'https://www.prydwen.gg/static/b28fe70a0dc85908deec51b98e95e180/7dccd/ch3_10.webp',
	],
	[
		'https://www.prydwen.gg/static/272bb2be165312117fca816995391eec/7dccd/ch4_1.webp',
		'https://www.prydwen.gg/static/ffe868c00b90019b87af2ee5d080bc1e/7dccd/ch4_2.webp',
		'https://www.prydwen.gg/static/c359a302d334d0bbaee1723e735b208b/7dccd/ch4_3.webp',
		'https://www.prydwen.gg/static/538eb97869a4309cc7e09d3c489dcffb/7dccd/ch4_4.webp',
		'https://www.prydwen.gg/static/807958783240daad002bc65e59b3feeb/7dccd/ch4_5.webp',
		'https://www.prydwen.gg/static/8bf0e98786c2867cb81abb715c49ff78/7dccd/ch4_6.webp',
		'https://www.prydwen.gg/static/c99d4625356355d007cfba55bc4e8cfa/7dccd/ch4_7.webp',
		'https://www.prydwen.gg/static/099d0f314e120b7ed4e47f3136af051d/7dccd/ch4_8.webp',
		'https://www.prydwen.gg/static/aa30eba67b5e22ecbab5784dd2e79ce5/7dccd/ch4_9.webp',
		'https://www.prydwen.gg/static/ee8610fdb5ec14106df906803d8db64f/7dccd/ch4_10.webp',
		'https://www.prydwen.gg/static/3663f1d095d088987bd428cd6f1552c0/7dccd/ch4_11.webp',
	],
	[
		'https://www.prydwen.gg/static/bbc3a571de101463f6347e5614e1c530/7dccd/ch5_1.webp',
		'https://www.prydwen.gg/static/aa478ee46b1c459efe069ef9c3f6a57a/7dccd/ch5_2.webp',
		'https://www.prydwen.gg/static/91f3baddbeb479c8799a549c2e516c7c/7dccd/ch5_3.webp',
		'https://www.prydwen.gg/static/b2b914c502934e9541433ff915af3f5a/7dccd/ch5_4.webp',
		'https://www.prydwen.gg/static/451ab9891beda7bb821662e76a002fef/7dccd/ch5_5.webp',
		'https://www.prydwen.gg/static/1d1c02a09d1ac66efc76e85b71092142/7dccd/ch5_6.webp',
		'https://www.prydwen.gg/static/b813cbb472907c2c9905958e3ea6c691/7dccd/ch5_7.webp',
		'https://www.prydwen.gg/static/2f9cdac81da4712bfaf124b6c2c36bf6/7dccd/ch5_8.webp',
		'https://www.prydwen.gg/static/5eaff5e56accb307293db77cd323e20f/7dccd/ch5_9.webp',
		'https://www.prydwen.gg/static/246a0b487d0c7062eecc6c96be3a536a/7dccd/ch5_10.webp',
		'https://www.prydwen.gg/static/546d6550b497277300a8d6949f21e0c8/7dccd/ch5_11.webp',
	],
	[
		'https://www.prydwen.gg/static/38716d9227b79585b9a2be343bd2378e/7dccd/ch6_1.webp',
		'https://www.prydwen.gg/static/7bdcdc198b0e52ac259eed39b503f224/7dccd/ch6_2.webp',
		'https://www.prydwen.gg/static/3a7b3e1c574d7fcb79672006e8207ffa/7dccd/ch6_3.webp',
		'https://www.prydwen.gg/static/83601fb70e41847d0908138ae557d23e/7dccd/ch6_4.webp',
		'https://www.prydwen.gg/static/ef1504ac4d825386e6d1bb0fa5f32752/7dccd/ch6_5.webp',
		'https://www.prydwen.gg/static/17009743f336f8c8165ae25982141123/7dccd/ch6_6.webp',
		'https://www.prydwen.gg/static/71b0fcb90d22c02aa9f2f90f039ad7d1/7dccd/ch6_7.webp',
		'https://www.prydwen.gg/static/7119449e3e2b3f7ac2e5337856df9e29/7dccd/ch6_8.webp',
		'https://www.prydwen.gg/static/6fcfc7b53239f73dd792b9a0a8368eac/7dccd/ch6_9.webp',
		'https://www.prydwen.gg/static/750f6023f31c0a6643dba9107b8dd0a6/7dccd/ch6_10.webp',
		'https://www.prydwen.gg/static/1ba4e9f8930ee84de7466bbcac529155/7dccd/ch6_11.webp',
	],
	[
		'https://www.prydwen.gg/static/afde3aecf3625d00012be8e80fc55985/7dccd/ch7_1.webp',
		'https://www.prydwen.gg/static/8493feee36a047c94e5b2a0b57008e71/7dccd/ch7_2.webp',
		'https://www.prydwen.gg/static/eefaaa72c41067e5bdf3af7a8f0401f9/7dccd/ch7_3.webp',
		'https://www.prydwen.gg/static/6cadbfb5bb02aca90ceeff2032ab2a66/7dccd/ch7_4.webp',
		'https://www.prydwen.gg/static/0edf89d811c20e194a38322954b660e6/7dccd/ch7_5.webp',
		'https://www.prydwen.gg/static/af460ed45acbceacc8f99f659deaf733/7dccd/ch7_6.webp',
		'https://www.prydwen.gg/static/296b87f58ad2ed10084c9b4ffd4679a9/7dccd/ch7_7.webp',
		'https://www.prydwen.gg/static/468e98a6841be74e79c06550d2944547/7dccd/ch7_8.webp',
		'https://www.prydwen.gg/static/629db32e530dbd33033307ac871d4b75/7dccd/ch7_9.webp',
		'https://www.prydwen.gg/static/7ea7c8318b1070afaecd2bfb28fc4fce/7dccd/ch7_10.webp',
	],
	[
		'https://www.prydwen.gg/static/fce3929648f11ee965355b5b7f9e0235/7dccd/ch8_1.webp',
		'https://www.prydwen.gg/static/ca06c4aa72938555211c093c67d327f4/7dccd/ch8_2.webp',
		'https://www.prydwen.gg/static/140ed9b00d06c6005c574fe410c81b02/7dccd/ch8_3.webp',
		'https://www.prydwen.gg/static/7a774c5096998da837592cc7ca2aaf5b/7dccd/ch8_4.webp',
		'https://www.prydwen.gg/static/16a245b8dfcbdde5c8896d631f66591d/7dccd/ch8_5.webp',
		'https://www.prydwen.gg/static/812025141839a1f79d7a042c4ca0fbdb/7dccd/ch8_6.webp',
		'https://www.prydwen.gg/static/ab73c95f926f5d0bf1dc930b43987b92/7dccd/ch8_7.webp',
		'https://www.prydwen.gg/static/918e36d0ee4967e4466998d695374c09/7dccd/ch8_8.webp',
		'https://www.prydwen.gg/static/d4778a8142c1bbd52f9b30f3df00fbdf/7dccd/ch8_9.webp',
		'https://www.prydwen.gg/static/320910acc8e5fd72d22cab9ac7b5fe3f/7dccd/ch8_10.webp',
		'https://www.prydwen.gg/static/f551e068949d6a28f554456d946a208a/7dccd/ch8_11.webp',
		'https://www.prydwen.gg/static/cb1e190a65c1698ba3d6e10109fc7b21/7dccd/ch8_12.webp',
	],
	[
		'https://www.prydwen.gg/static/c818f96994fb5de016c9fc4ebd356325/7dccd/ch9_1.webp',
		'https://www.prydwen.gg/static/54b572e21f6d17fd7d3edfa64de400a8/7dccd/ch9_2.webp',
		'https://www.prydwen.gg/static/a552e6c8ac75ff89c458c341682f3c66/7dccd/ch9_3.webp',
		'https://www.prydwen.gg/static/5cb054e405b615201305d309556b1d54/7dccd/ch9_4.webp',
		'https://www.prydwen.gg/static/92fbcd29ff2f24d123d642b78678b26a/7dccd/ch9_5.webp',
		'https://www.prydwen.gg/static/c4370dbbd8d04a601a11f09f62711ff8/7dccd/ch9_6.webp',
		'https://www.prydwen.gg/static/3de1456d605c896d5ae3923f4e054e80/7dccd/ch9_7.webp',
		'https://www.prydwen.gg/static/8b98c7ef947dc09f0569f60fe2432fad/7dccd/ch9_8.webp',
		'https://www.prydwen.gg/static/b22a47bebea10817b8ae3c3d033846a3/7dccd/ch9_9.webp',
		'https://www.prydwen.gg/static/4e7e8d1efce358ef7a8daad75714af1c/7dccd/ch9_10.webp',
		'https://www.prydwen.gg/static/262e9d1cd4d318b1e27b7bcb0afeada8/7dccd/ch9_11.webp',
		'https://www.prydwen.gg/static/50e4bb99bc2216abcc517b3715741587/7dccd/ch9_12.webp',
	],
]