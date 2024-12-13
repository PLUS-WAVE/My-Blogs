import{_ as t,c as i,e as a,o as s}from"./app-koSCgMdL.js";const l={};function n(o,e){return s(),i("div",null,e[0]||(e[0]=[a(`<p>我们以采用 GitHub 上的开源库 <a href="https://github.com/fixstars/cuda-bundle-adjustment" target="_blank" rel="noopener noreferrer">cuda-bundle-adjustment</a> 为例，其不能直接用vcpkg进行安装，只能通过cmake编译后链接到VS2022。</p><p>将 cuda-bundle-adjustment 库通过 CMake 编译链接到 Visual Studio 2022 步骤操作：</p><ol><li><p>克隆存储库：使用 git 命令克隆 cuda-bundle-adjustment</p><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">git</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> clone</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> https://github.com/fixstars/cuda-bundle-adjustment.git</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li><li><p>创建构建目录：在克隆的 cuda-bundle-adjustment 目录内创建一个名为“build”的文件夹，这将用作构建目录，以保持源代码目录的干净和分离</p></li><li><p>配置CMake：使用CMake GUI 进行操作</p><p><strong>注意</strong>：我们的 Eigen3、 OpenCV 和 cuda 的一些<strong>前置条件</strong>库都是使用的 vcpkg 安装的，所以我们需要将 <strong>vcpkg 链接</strong>到这里：</p><p>在 cuda-bundle-adjustment 目录下的 <em>CMakeLists.txt</em> 中的第一行添加：</p><div class="language-makefile line-numbers-mode" data-ext="makefile" data-title="makefile"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">set(CMAKE_TOOLCHAIN_FILE &quot;[你的vcpkg路径]/vcpkg/scripts/buildsystems/vcpkg.cmake&quot;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">  CACHE STRING &quot;Vcpkg toolchain file&quot;)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>选好源码地址和 build 地址</li><li>再配置好红色部分的属性（一些设置，具体可见项目的README）</li><li>点击下方 <code>Configure</code> 编译</li><li>再点击 <code>Generate</code> 生成 build</li></ul><img src="https://raw.githubusercontent.com/PLUS-WAVE/blog-image/master/img/blog/2024-03-15/image-20240315174348844.png" alt="image-20240315174348844" style="zoom:33%;"><p>这会生成一个 Visual Studio 2022 项目，并将其输出到 build 目录中</p></li><li><p>构建项目：在 Visual Studio 中，选择要构建的项目配置（例如Debug或Release），然后右击 ALL_BUILD，选择“生成”，即可在对应 Release 文件夹中得到 <strong>cuda_bundle_adjustment.lib</strong></p><img src="https://raw.githubusercontent.com/PLUS-WAVE/blog-image/master/img/blog/2024-03-15/image-20240315213035387.png" style="zoom:67%;"></li><li><p>加入VS项目：前面得到的是静态库 .lib 文件，接下来将 .lib 文件放入VS项目文件夹的lib文件夹（自己建一个）中，并且将 cuda-bundle-adjustment 目录下中的 include 文件夹复制到VS项目文件夹中</p><img src="https://raw.githubusercontent.com/PLUS-WAVE/blog-image/master/img/blog/2024-03-15/image-20240315213602502.png" style="zoom:50%;"></li><li><p>配置VS项目：在项目的属性进行如下设置，添加 <code>.\\include</code> 和 <code>.\\lib</code> 到下面的三个地方</p><blockquote><p>特别提醒：注意属性上方的“<strong>配置</strong>”和“<strong>平台</strong>”要和运行项目时的一致</p></blockquote><img src="https://raw.githubusercontent.com/PLUS-WAVE/blog-image/master/img/blog/2024-03-15/image-20240315213847838.png" alt="image-20240315213847838" style="zoom:50%;"><img src="https://raw.githubusercontent.com/PLUS-WAVE/blog-image/master/img/blog/2024-03-15/image-20240315213911989.png" alt="image-20240315213911989" style="zoom:50%;"></li><li><p>并且添加静态库文件的完整文件名称到如下地方：</p><img src="https://raw.githubusercontent.com/PLUS-WAVE/blog-image/master/img/blog/2024-04-17/image-20240417155950478.png" alt="image-20240417155950478" style="zoom:50%;"><p>这样与链接器中的常规的附加库目录就构成了完整的 <code>.lib</code> 文件的路径：<code>./lib/cuda_bundle_adjustment.lib</code></p></li></ol><p>完成！运行！</p>`,4)]))}const r=t(l,[["render",n],["__file","index.html.vue"]]),p=JSON.parse(`{"path":"/article/x7anrtzf/","title":"CMake+Vcpkg+VS2022配置github上的cmake开源项目外部库","lang":"zh-CN","frontmatter":{"title":"CMake+Vcpkg+VS2022配置github上的cmake开源项目外部库","tags":["Skills","CMake","Vcpkg","VS2022","GitHub"],"createTime":"2024/03/15 20:33:15","permalink":"/article/x7anrtzf/","description":"我们以采用 GitHub 上的开源库 cuda-bundle-adjustment 为例，其不能直接用vcpkg进行安装，只能通过cmake编译后链接到VS2022。 将 cuda-bundle-adjustment 库通过 CMake 编译链接到 Visual Studio 2022 步骤操作： 克隆存储库：使用 git 命令克隆 cuda-bund...","head":[["meta",{"property":"og:url","content":"https://plus-wave.github.io/article/x7anrtzf/"}],["meta",{"property":"og:site_name","content":"PLUS-WAVE's Blog"}],["meta",{"property":"og:title","content":"CMake+Vcpkg+VS2022配置github上的cmake开源项目外部库"}],["meta",{"property":"og:description","content":"我们以采用 GitHub 上的开源库 cuda-bundle-adjustment 为例，其不能直接用vcpkg进行安装，只能通过cmake编译后链接到VS2022。 将 cuda-bundle-adjustment 库通过 CMake 编译链接到 Visual Studio 2022 步骤操作： 克隆存储库：使用 git 命令克隆 cuda-bund..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-24T09:20:53.000Z"}],["meta",{"property":"article:tag","content":"Skills"}],["meta",{"property":"article:tag","content":"CMake"}],["meta",{"property":"article:tag","content":"Vcpkg"}],["meta",{"property":"article:tag","content":"VS2022"}],["meta",{"property":"article:tag","content":"GitHub"}],["meta",{"property":"article:modified_time","content":"2024-11-24T09:20:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"CMake+Vcpkg+VS2022配置github上的cmake开源项目外部库\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-11-24T09:20:53.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":2.12,"words":636},"git":{"updatedTime":1732440053000,"contributors":[{"name":"PLUS_WAVE","email":"wangplus_wave@foxmail.com","commits":3,"avatar":"https://avatars.githubusercontent.com/PLUS_WAVE?v=4","url":"https://github.com/PLUS_WAVE"}]},"autoDesc":true,"filePathRelative":"1. Tools & Skills/2. CMake+Vcpkg+VS2022配置github上的cmake开源项目外部库.md","categoryList":[{"id":"873c88","sort":1,"name":" Tools & Skills"}],"bulletin":false}`);export{r as comp,p as data};
