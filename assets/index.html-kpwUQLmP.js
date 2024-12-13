import{_ as a,c as t,e as n,o as i}from"./app-koSCgMdL.js";const e={};function l(p,s){return i(),t("div",null,s[0]||(s[0]=[n('<h3 id="_1-contributions" tabindex="-1"><a class="header-anchor" href="#_1-contributions"><span>1 Contributions</span></a></h3><ol><li><p><strong>混合显式-隐式网络架构</strong>：提出了一种 Tri-plane 的3D表征方法，结合显式体素网格与隐式解码器的优点</p><ul><li>速度快，内存效率高；</li><li>支持高分辨率生成，保持3D表征的灵活性和表达能力。</li><li>与纯显式或隐式方法相比，既解决了查询速度慢的问题，又能更好地扩展到高分辨率。</li></ul></li><li><p><strong>使用超分辨率模块 Super Resolution</strong> ：解决高分辨率训练和渲染的计算限制。</p></li><li><p><strong>双鉴别器 dual-discrimination</strong>：在生成器的渲染结果与最终输出之间引入双重判别器，增强了神经渲染与最终输出之间的一致性，避免了视图不一致的问题。即将超分辨率之前的图像和超分辨率之后的拼在一起鉴别。</p></li><li><p><strong>姿态条件生成 pose-based conditioning to the generator</strong>：</p><ul><li><p>引入基于姿态的条件生成方法，使生成器在推理时能输出与多视图一致的图像。</p></li><li><p>同时，能够很好建模训练数据中与姿态相关的属性分布（如人脸表情的变化）。</p></li></ul></li><li><p><strong>特征生成与神经渲染的解耦</strong>：</p><ul><li>利用2D GAN（如StyleGAN2）的特征生成器，结合3D神经体积渲染，提高效率和效果。</li></ul></li></ol><h3 id="_2-related-works" tabindex="-1"><a class="header-anchor" href="#_2-related-works"><span>2 Related Works</span></a></h3><img src="https://raw.githubusercontent.com/PLUS-WAVE/blog-image/master/img/blog/2024-11-22/image-20241117093034122.png" alt="image-20241117093034122" style="zoom:50%;"><ul><li><strong>隐式表示</strong>（NeRF）：这些方法需要大型的全连接网络，每次<strong>查询都需要完整的网络计算，速度慢</strong>。</li><li><strong>显式表示</strong>（Voxels）：评估速度快，但内存开销大，<strong>难以扩展到高分辨率</strong>或复杂场景。</li><li><strong>混合显式-隐式表示</strong>：结合了以上两种方法的优点，提供了计算和内存效率更高的架构。局部隐式表示和混合架构通过在显式存储的基础上，使用隐式解码器来聚合特征，从而实现高效的渲染。</li></ul><h3 id="_3-method" tabindex="-1"><a class="header-anchor" href="#_3-method"><span>3 Method</span></a></h3><img src="https://raw.githubusercontent.com/PLUS-WAVE/blog-image/master/img/blog/2024-11-22/image-20241117094416393.png" alt="image-20241117094416393" style="zoom:50%;"><p><strong>Tri-plane特征的生成</strong>：</p><ul><li>在GAN设置中，<strong>Tri-plane特征是由2D卷积的StyleGAN2骨干网络生成的</strong>。</li><li>每个Tri-plane包含32个通道，共96个通道。</li></ul><p><strong>神经渲染和超分辨率模块</strong>：</p><ul><li>在GAN设置中，神经渲染器从每个32通道的Tri-plane中聚合特征，<strong>预测出给定相机姿态下的32通道特征图像</strong>。</li><li>随后，通过一个“<strong>超分辨率</strong>”模块对这些神经渲染的原始图像进行上采样和细化。</li></ul><p><strong>判别器</strong>：</p><ul><li>生成的图像由<strong>稍微修改的StyleGAN2判别器</strong>进行评判。</li></ul><p><strong>训练策略</strong>：</p><ul><li>加速训练 <ul><li>首先，以较低的神经渲染分辨率（64×64）进行训练；</li><li>然后，在完整的神经渲染分辨率（128×128）上进行短时间的微调。</li></ul></li><li><strong>正则化</strong>：额外的实验发现，对密度场的光滑度进行正则化有助于减少3D形状中的伪影</li></ul><h4 id="_3-1-tri-plane混合3d表示" tabindex="-1"><a class="header-anchor" href="#_3-1-tri-plane混合3d表示"><span>3.1 Tri-plane混合3D表示</span></a></h4><p>作者提出了一种新的 <strong>Tri-plane 混合显式-隐式3D表示方法</strong></p><ul><li><strong>Tri-plane 表示</strong>：将3D空间的特征投影到三个轴对齐的正交平面（XY、XZ、YZ平面），每个平面具有尺寸为 N×N×C，其中 N 是分辨率，C 是通道数。</li><li><strong>特征查询和聚合</strong>：对于任意的3D点，通过在三个平面上进行双线性插值获取特征，然后将这些特征向量相加，得到聚合的3D特征。</li><li><strong>轻量级解码器</strong>：使用小型的MLP解码器将聚合的特征转换为颜色和密度信息。</li><li><strong>体渲染</strong>：通过神经体渲染生成最终的图像。</li></ul><p><strong>优势</strong>：</p><ul><li><strong>高效性</strong>：相比于完全隐式的表示，减少了计算成本，因为解码器更小，主要的计算集中在显式存储的特征上。</li><li><strong>表现力</strong>：尽管表示紧凑，但仍具有足够的表达能力，能够捕捉复杂的细节。</li><li><strong>扩展性</strong>：特征平面的存储需求为 O(N²)，而体素网格为 O(N³)，因此在相同内存条件下，Tri-plane表示可以使用更高的分辨率。</li></ul><h4 id="_3-2-cnn生成器骨干网络与渲染" tabindex="-1"><a class="header-anchor" href="#_3-2-cnn生成器骨干网络与渲染"><span>3.2 CNN生成器骨干网络与渲染</span></a></h4><p><strong>Tri-plane 特征的生成</strong>：</p><ul><li>在GAN设置中，Tri-plane 表示的特征是由<strong>StyleGAN2 CNN生成器</strong>生成的。</li><li><strong>随机潜码和相机参数</strong>首先通过一个<strong>映射网络</strong>处理，得到<strong>中间潜码</strong>，用于调制一个单独的<strong>合成网络</strong>的卷积核。</li></ul><p><strong>输出形状的修改</strong>：</p><p>修改了StyleGAN2骨干网络的输出形状：不再生成三通道的RGB图像，而是生成一个<strong>256×256×96</strong>的特征图像。这个特征图像在通道维度上拆分并重塑，形成三个<strong>32通道的平面</strong>（对应于Tri-plane表示）。</p><p><strong>特征采样与解码</strong>：</p><ul><li>从Tri-plane中<strong>采样特征</strong>，通过求和进行<strong>聚合</strong>。</li><li>使用一个轻量级解码器处理聚合后的特征：解码器是一个具有单隐藏层（64个单元）和softplus激活函数的<strong>MLP</strong>。</li></ul><p><strong>混合表示的查询与输出</strong>：</p><ul><li>这个混合表示可以对<strong>连续坐标</strong>进行查询，输出一个<strong>标量密度σ</strong>和一个<strong>32通道的特征</strong>。</li><li>然后，这些输出被神经体积渲染器处理，将3D特征体积投影到2D特征图像上。</li></ul><p><strong>体积渲染</strong>：</p><ul><li>体积渲染使用了与<strong>NeRF中相同的方法</strong>实现。</li><li>特征图像的生成：在GAN框架中，体积渲染生成的是<strong>特征图像</strong>，而不是RGB图像。因为特征图像包含了更多信息，可以有效地用于后续的图像空间细化。</li></ul><h4 id="_3-3-超分辨率-super-resolution" tabindex="-1"><a class="header-anchor" href="#_3-3-超分辨率-super-resolution"><span>3.3 超分辨率 Super Resolution</span></a></h4><p>虽然Tri-plane表示相比之前的方法在计算效率上有显著提升，但在高分辨率下直接进行训练或渲染仍然太慢。因此，作者选择在中等分辨率（如128×128）下执行体渲染，然后依靠图像空间的卷积操作将神经渲染结果<strong>上采样</strong>到最终的图像尺寸（256×256或512×512）。</p><p><strong>超分辨率模块的设计：</strong></p><ul><li><strong>结构</strong>：由两个包含StyleGAN2调制卷积层的模块组成，这些卷积层对32通道的特征图像 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>I</mi><mi>F</mi></msub></mrow><annotation encoding="application/x-tex">I_F</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07847em;">I</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0785em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.13889em;">F</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> 进行上采样和细化，生成最终的RGB图像 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msubsup><mi>I</mi><mrow><mi>R</mi><mi>G</mi><mi>B</mi></mrow><mo>+</mo></msubsup></mrow><annotation encoding="application/x-tex">I^+_{RGB}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.105em;vertical-align:-0.2935em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07847em;">I</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8115em;"><span style="top:-2.4065em;margin-left:-0.0785em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.05017em;">RGB</span></span></span></span><span style="top:-3.1031em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mbin mtight">+</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2935em;"><span></span></span></span></span></span></span></span></span></span> 。</li><li>细节：禁用了每像素的噪声输入，以减少纹理粘连现象（texture sticking）。重用了骨干网络的映射网络来对这些卷积层进行调制。</li></ul><h4 id="_3-4-双重判别-dual-discrimination" tabindex="-1"><a class="header-anchor" href="#_3-4-双重判别-dual-discrimination"><span>3.4 双重判别 Dual Discrimination</span></a></h4><p>在标准的2D GAN训练中，生成的图像通常由2D卷积判别器进行评判。作者使用了StyleGAN2的判别器，并进行了两个修改：</p><ol><li><p>双重判别：解决先前工作中出现的多视图不一致问题。</p><ul><li><p>将神经渲染的特征图像 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>I</mi><mi>F</mi></msub></mrow><annotation encoding="application/x-tex">I_F</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07847em;">I</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0785em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.13889em;">F</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> 的前三个特征通道解释为低分辨率的RGB图像 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>I</mi><mrow><mi>R</mi><mi>G</mi><mi>B</mi></mrow></msub></mrow><annotation encoding="application/x-tex">I_{RGB}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07847em;">I</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0785em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.05017em;">RGB</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> 。</p></li><li><p>将 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>I</mi><mrow><mi>R</mi><mi>G</mi><mi>B</mi></mrow></msub></mrow><annotation encoding="application/x-tex">I_{RGB}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07847em;">I</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0785em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.05017em;">RGB</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> 双线性上采样到与超分辨率图像 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msubsup><mi>I</mi><mrow><mi>R</mi><mi>G</mi><mi>B</mi></mrow><mo>+</mo></msubsup></mrow><annotation encoding="application/x-tex">I^+_{RGB}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.105em;vertical-align:-0.2935em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07847em;">I</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8115em;"><span style="top:-2.4065em;margin-left:-0.0785em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.05017em;">RGB</span></span></span></span><span style="top:-3.1031em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mbin mtight">+</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2935em;"><span></span></span></span></span></span></span></span></span></span> 相同的分辨率。</p></li><li><p>将上采样后的 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>I</mi><mrow><mi>R</mi><mi>G</mi><mi>B</mi></mrow></msub></mrow><annotation encoding="application/x-tex">I_{RGB}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07847em;">I</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.0785em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.05017em;">RGB</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> 与 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msubsup><mi>I</mi><mrow><mi>R</mi><mi>G</mi><mi>B</mi></mrow><mo>+</mo></msubsup></mrow><annotation encoding="application/x-tex">I^+_{RGB}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.105em;vertical-align:-0.2935em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07847em;">I</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8115em;"><span style="top:-2.4065em;margin-left:-0.0785em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.05017em;">RGB</span></span></span></span><span style="top:-3.1031em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mbin mtight">+</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2935em;"><span></span></span></span></span></span></span></span></span></span> 进行通道上的连接，形成一个<strong>六通道的图像</strong>输入判别器（见图4）。</p></li><li><p>对每个真实图像，生成一个适当模糊的副本，与原图像连接，形成<strong>六通道输入</strong>。</p></li></ul></li><li><p>使判别器感知相机姿态：按照StyleGAN2-ADA中的条件生成策略，将渲染相机的内参和外参矩阵（统称为 (P)）作为条件标签传递给判别器。</p><ul><li>作用：这一条件输入为判别器提供了额外的信息，引导生成器<strong>学习正确的3D先验</strong>。</li></ul></li></ol><h4 id="_3-5-姿态条件化-pose-based-conditioning" tabindex="-1"><a class="header-anchor" href="#_3-5-姿态条件化-pose-based-conditioning"><span>3.5 姿态条件化 pose-based conditioning</span></a></h4><p>摄像机姿态与其他属性（例如面部表情）存在相关性。如果直接处理，可能会导致视图不一致的结果。例如，摄像机相对于人脸的角度与微笑可能存在相关性。</p><p>生成器的姿态条件化（Generator Pose Conditioning）</p><ul><li>方法：在提供给生成器的映射网络时，除了潜码向量 (z) 外，还输入相机参数 (P)，遵循条件生成策略。</li><li>作用： <ul><li>通过让生成器知晓渲染相机的位置，使目标视角能够影响场景的合成。</li><li>在训练过程中，姿态条件化使生成器能够建模数据集中隐含的姿态依赖偏差，从而可靠地再现数据集中的图像分布。</li></ul></li></ul>',42)]))}const r=a(e,[["render",l],["__file","index.html.vue"]]),o=JSON.parse(`{"path":"/article/xp7fagsk/","title":"EG3D 学习笔记","lang":"zh-CN","frontmatter":{"title":"EG3D 学习笔记","tags":["3DVision","NeRF","Head Avatar"],"createTime":"2024/11/16 16:30:25","permalink":"/article/xp7fagsk/","cover":"https://raw.githubusercontent.com/PLUS-WAVE/blog-image/master/img/blog/2024-11-22/image-20241117093034122.png","description":"1 Contributions 混合显式-隐式网络架构：提出了一种 Tri-plane 的3D表征方法，结合显式体素网格与隐式解码器的优点 速度快，内存效率高； 支持高分辨率生成，保持3D表征的灵活性和表达能力。 与纯显式或隐式方法相比，既解决了查询速度慢的问题，又能更好地扩展到高分辨率。 使用超分辨率模块 Super Resolution ：解决高分...","head":[["meta",{"property":"og:url","content":"https://plus-wave.github.io/article/xp7fagsk/"}],["meta",{"property":"og:site_name","content":"PLUS-WAVE's Blog"}],["meta",{"property":"og:title","content":"EG3D 学习笔记"}],["meta",{"property":"og:description","content":"1 Contributions 混合显式-隐式网络架构：提出了一种 Tri-plane 的3D表征方法，结合显式体素网格与隐式解码器的优点 速度快，内存效率高； 支持高分辨率生成，保持3D表征的灵活性和表达能力。 与纯显式或隐式方法相比，既解决了查询速度慢的问题，又能更好地扩展到高分辨率。 使用超分辨率模块 Super Resolution ：解决高分..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://raw.githubusercontent.com/PLUS-WAVE/blog-image/master/img/blog/2024-11-22/image-20241117093034122.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-24T09:31:32.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://raw.githubusercontent.com/PLUS-WAVE/blog-image/master/img/blog/2024-11-22/image-20241117093034122.png"}],["meta",{"name":"twitter:image:alt","content":"EG3D 学习笔记"}],["meta",{"property":"article:tag","content":"3DVision"}],["meta",{"property":"article:tag","content":"NeRF"}],["meta",{"property":"article:tag","content":"Head Avatar"}],["meta",{"property":"article:modified_time","content":"2024-11-24T09:31:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"EG3D 学习笔记\\",\\"image\\":[\\"https://raw.githubusercontent.com/PLUS-WAVE/blog-image/master/img/blog/2024-11-22/image-20241117093034122.png\\"],\\"dateModified\\":\\"2024-11-24T09:31:32.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":7.22,"words":2167},"git":{"updatedTime":1732440692000,"contributors":[{"name":"PLUS_WAVE","email":"wangplus_wave@foxmail.com","commits":1,"avatar":"https://avatars.githubusercontent.com/PLUS_WAVE?v=4","url":"https://github.com/PLUS_WAVE"}]},"autoDesc":true,"filePathRelative":"2. 3DV/19. EG3D.md","categoryList":[{"id":"cbcbb2","sort":2,"name":" 3DV"}],"bulletin":false}`);export{r as comp,o as data};
